"use srtict";

const express = require("express");
const router = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
    .select("id", "name", "description", "unit_price", "image")
    .from("products")
    .then((results) => {
      res.json(results);
    });
  });
  return router;
}
