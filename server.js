"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const basicAuth   = require('basic-auth');
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const knexConfig  = require("./knexfile");

//Database information
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const productsRoutes = require("./routes/products");

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

//Stripe test id
const stripe = require("stripe")("pk_test_nA2ImgLsFYl7lUGcafpZnbVN");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Api routes to get database information
app.use("/api/products", productsRoutes(knex));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

//Admin authentication
const authenticate = (req, res, next) => {
  const auth = require('basic-auth');
  const user = auth(req);
  if (user === undefined || user['name'] !== process.env.USERNAME || user['pass'] !== process.env.PASSWORD) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Bitte anmelden!"');
    res.render("bad_admin");
  } else {
    next();
  }
};

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

//Products page
app.get("/products", (rer, res) => {
  knex
  .select("*")
  .from("products")
  .orderBy("id", "asc")
  .then((products) => {
    res.render('product-display', {products: products} );
  })
  .catch((error) => {
    console.log("Error while querying database for products\n", error);
  })
})

//Individual product page
app.get("/products/:id", (req, res) => {
  let id = req.params.id;
  knex
  .select("id", "name", "description", "unit_price", "image")
  .from("products").where('id', id)
  .then((products) => {
        knex
        .select("rating", "description")
        .from("reviews").where('product_id', req.params.id)
        .then((reviews) => {
          res.render('single-product', {products: products, reviews: reviews, id: id} );
        })
        .then( () => {
          console.log("Success");
        })
        .catch( (error) => {
          console.log("Failure", error);
        })
      })
    })

//Custom crookie page
app.post("/custom", (req, res) => {
  let flavour = req.body.flavour; //Chosen crookie flavour
  knex("products")
  .select("*")
  .where("name", flavour)
  .then( (product) => {
    res.render('custom', {product: product});
  })
  .catch((error) => {
    console.log("Error while querying database for custom crookie\n", error);
  })
})

//Create a review
app.post("/products/:id", (req, res) => {
  let id = req.params.id;
  knex('reviews').insert({
      product_id: req.params.id,
      description: req.body.description,
      rating: req.body.rating
  })
  .return({
    inserted: true
  })
  .then(() => {
    res.redirect(id);
  });
})

//Cart page
app.get("/cart", (req, res) => {
  res.render("cart");
})

//Checkout page
app.get("/checkout", (req, res) => {
  res.render("checkout");
});

//Create an order
app.post("/checkout", (req, res) => {
  let cart = JSON.parse(req.body.cart);
  knex('orders')
  .returning('id')
  .insert({ //new order information
    total_price: cart.total,
    stripe_charge_id: req.body.token,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    shipping_address: req.body.shipping_address,
    shipping_city: req.body.shipping_city,
    shipping_postalcode: req.body.shipping_postalcode,
    shipping_province: req.body.shipping_province,
    shipping_country: req.body.shipping_country,
    message: req.body.message,
    shipped: false
  }).then( (result) => {
    console.log("Inserted new order.");
    for(let product in cart.products) {
      knex("line_items").insert({ //items included in new order
        order_id: result[0],
        product_id: product,
        quantity: cart.products[product].quantity,
        product_name: cart.products[product].name,
        unit_price: cart.products[product].price,
        subtotal: (Math.round((cart.products[product].quantity * cart.products[product].price) * 100) / 100),
        crookie_note: cart.products[product].crookie_note
      })
      .then( () => {
        console.log("Inserted item into line_items.");
      })
      .catch((error) => {
        console.log("Error while inserting line item into database\n", error);
      })
    }
  })
  .return({
    inserted: true
  })
  .then(() => {
    res.redirect("/checkout/receipt");
  })
  .catch( (error) => {
    console.log("Error while inserting order iinto database\n", error);
  })
})

//Checkout receipt page
app.get("/checkout/receipt", function(req, res) {
  res.render("receipt");
})

//Stripe JS
app.post("/plans/browserling_developer", function(req, res) {
  stripe.customers.create({
    card : req.body.stripeToken,
    email : "...", // customer's email (get it from db or session)
    plan : "browserling_developer"
  }, function (err, customer) {
    if (err) {
      var msg = customer.error.message || "unknown";
      res.send("Error while processing your payment: " + msg);
    }
    else {
      var id = customer.id;
      console.log('Success! Customer with Stripe ID ' + id + ' just signed up!');
      // save this customer to your database here!
      res.send('ok');
    }
  });
});

//Administrator page to review orders
app.get("/admin", authenticate, (req, res) => {
  knex
  .select("*")
  .from("orders")
  .orderBy("id", "desc")
  .then((orders) => {
    knex
    .select("*")
    .from("line_items")
    .then((line_items) => {
      res.render('admin', {orders: orders, line_items: line_items} );
    })
    .catch((error) => {
      console.log(error);
    });
  })
  .catch( (error) => {
    console.log(error);
  })
});

//Admin order shipped change
app.post("/admin", (req, res) => {
  let order_id = req.body.order_id;
  let shipped = req.body.shipped;
  if(shipped){
    knex("orders")
    .where("id", order_id)
    .update("shipped", shipped)
    .then( () => {
      res.send();
    })
    .catch( (error) => {
      console.log("Error while trying to update order shipping status\n", error);
    });
  }
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
