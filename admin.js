"use srtict";

const express = require("express");
const router = express.Router();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex    = require("knex")(knexConfig[ENV]);




let table;

  // router.get("/admin", (req, res) => {
    knex
    .select('*')
    .from("orders")
    .innerJoin('line_items', 'orders.id', 'order_id')
    .innerJoin('products', 'product_id', 'products.id')
    .then((results) => {
      console.log(results);
    });
    console.log(table);

  // });
  // return router;
