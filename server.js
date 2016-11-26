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
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const productsRoutes = require("./routes/products");

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

const stripeApiKey = "...";
const stripeApiKeyTesting = "..."
const stripe = require('stripe')(stripeApiKey);

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

const authenticate = (req, res, next) => {
  const auth = require('basic-auth');
  const user = auth(req);
  if (user === undefined || user['name'] !== process.env.USERNAME || user['pass'] !== process.env.PASSWORD) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Bitte anmelden!"');
    res.end('Unauthorized');
  } else {
    next();
  }
};

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/admin", authenticate, (req, res) => {
  knex
  .select("*")
  .from("orders")
  .then((orders) => {
    res.render('admin', {orders: orders} );
  })
});

app.get("/checkout", (req, res) => {
    res.render("checkout");
});

app.get("/products", (rer, res) => {
  knex
  .select("id", "name", "description", "unit_price", "image")
  .from("products")
  .then((products) => {
    res.render('product-display', {products: products} );
  })
})

app.get("/products/:id", (req, res) => {
  id: req.params.id
  knex
  .select("id", "name", "description", "unit_price", "image")
  .from("products").where('id', req.params.id)
  .then((products) => {
        knex
        .select("rating", "description")
        .from("reviews").where('product_id', req.params.id)
        .then((reviews) => {
          res.render('single-product', {products: products, reviews: reviews} );
        })
      })
    })


app.post("/products/:id", (req, res) => {
  const id = req.params.id
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

app.get("/cart", (req, res) => {
  res.render("cart", {

  });
})

app.post("/checkout", (req, res) => {
  knex('orders').insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      shipping_address: req.body.shipping_address,
      shipping_city: req.body.shipping_city,
      shipping_postalcode: req.body.shipping_postalcode,
      shipping_country: req.body.shipping_country
  })
  .return({
    inserted: true
  })
  .then(() => {
    res.render("index");
  });
})

app.post("/plans/browserling_developer", function(req, res) {
  stripe.customers.create({
    card : req.body.stripeToken,
    email : "...", // customer's email (get it from db or session)
    plan : "browserling_developer"
  }, function (err, customer) {
    if (err) {
      var msg = customer.error.message || "unknown";
      res.send("Error while processing your payment: " + msg)
    }
    else {
      var id = customer.id;
      console.log('Success! Customer with Stripe ID ' + id + ' just signed up!');
      // save this customer to your database here!
      res.send('ok');
    }
  });
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
