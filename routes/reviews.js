"use srtict";

const express = require("express");
const router = express.Router();

module.exports = (knex) => {

  router.get("/reviews", (req, res) => {
    knex
    .select("ratings", "description")
    .from("reviews")
    .then((results) => {
      res.json(results);
    });
  });
  return router;
}
