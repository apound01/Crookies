"use srtict";

const express = require("express");
const router = express.Router();

module.exports = (knex) => {

  router.get("/admin", (req, res) => {
    knex
    .select("id", "first_name", "last_name", "email", "shipping_address", "shipping_city", "shipping_postalcode", "shipping_country")
    .from("orders")
    .then((results) => {
      res.json(results);
    });
  });
  return router;
}
