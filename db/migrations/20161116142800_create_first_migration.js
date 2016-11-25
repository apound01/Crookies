exports.up = function(knex, Promise) {
 return Promise.all([

    knex.schema.createTable('orders', function (table) {
      table.increments();
      table.float('total_cents');
      table.string('stripe_charge_id');
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('shipping_address');
      table.string('shipping_city');
      table.string('shipping_postalcode');
      table.string('shipping_country')
    }),
    knex.schema.createTable('products', function (table) {
      table.increments();
      table.string('name');
      table.string('description');
      table.float('unit_price');
      table.string('image')
    }),
    knex.schema.createTable('line_items', function (table) {
      table.increments();
      table.integer('order_id');
      table.integer('product_id');
      table.integer('quantity');
      table.float('item_price_cents');
      table.float('total_price_cents')
    }),
    knex.schema.createTable('reviews', function (table) {
      table.increments();
      table.integer('product_id');
      table.integer('rating');
      table.text('description')
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('orders'),
    knex.schema.dropTable('products'),
    knex.schema.dropTable('line_items'),
    knex.schema.dropTable('reviews')
  ])
};
