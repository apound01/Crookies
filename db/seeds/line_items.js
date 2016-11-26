exports.seed = function(knex, Promise) {
  return knex('line_items').del()
    .then(function () {
      return Promise.all([
        knex('line_items').insert({
          id: 1,
          order_id: 1,
          product_id: 1,
          quantity: 2,
          item_price_cents: 2.99,
          total_price_cents: 6.99
        }),
        knex('line_items').insert({
          id: 2,
          order_id: 1,
          product_id: 2,
          quantity: 3,
          item_price_cents: 2.99,
          total_price_cents: 6.99
        }),
        knex('line_items').insert({
          id: 3,
          order_id: 1,
          product_id: 3,
          quantity: 4,
          item_price_cents: 2.99,
          total_price_cents: 6.99,

        }),
        knex('line_items').insert({
          id: 4,
          order_id: 2,
          product_id: 4,
          quantity: 5,
          item_price_cents: 2.99,
          total_price_cents: 6.99
        }),
        knex('line_items').insert({
          id: 5,
          order_id: 2,
          product_id: 5,
          quantity: 2,
          item_price_cents: 2.99,
          total_price_cents: 6.99
        }),
        knex('line_items').insert({
          id: 6,
          order_id: 3,
          product_id: 6,
          quantity: 2,
          item_price_cents: 2.99,
          total_price_cents: 6.99
        })
      ]);
    });

};
