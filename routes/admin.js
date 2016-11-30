"use strict";

const express = require("express");
const router = express.Router();
const basicAuth   = require('basic-auth');


module.exports = (knex) => {

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

  router.get("/admin", authenticate, (req, res) => {
    knex
      .select("*")
      .from("orders")
      .then((orders) => {
        knex
        .select("*")
        .from("line_items")
        .then((line_items) => {
          res.render('admin', {orders: orders, line_items: line_items} );
        })
      })
    });
  return router;
}
