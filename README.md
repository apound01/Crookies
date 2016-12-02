# Christmas Crookies

## By Amy Pound and Guy Booth

Christmas Crookies is a fully functioning e-commerce web app built on node.js and Express where users can purchase good looking, foul tasting Christmas cookies. Customers can browse products, add items to their cart, leave comments and checkout using Stripe payment. 

Tech Stack

* node.js
* Express
* PostgreSQL
* Knex
* jQuery
* AJAX
* Stripe API

## Instructions

1. Clone master repository
2. Install dependencies: `npm i`
2. Update the .env file with your correct local information
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`
