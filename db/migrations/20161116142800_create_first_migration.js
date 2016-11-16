exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('username');
      table.string('email');
      table.string('password');
      table.boolean('admin')
    }),
    knex.schema.createTable('orders', function (table) {
      table.increments();
      table.integer('user_id');
      table.integer('total_cents');
      table.string('stripe_charge_id');
      table.string('email');
      table.string('shipping_address');
      table.string('shipping_city');
      table.string('shipping_postalcode');
      table.string('shipping_country')
    }),
    knex.schema.createTable('products', function (table) {
      table.increments();
      table.string('name');
      table.text('description');
      table.integer('unit_price');
      table.string('image')
    }),
    knex.schema.createTable('line_items', function (table) {
      table.increments();
      table.integer('order_id');
      table.integer('product_id');
      table.integer('quantity');
      table.integer('item_price_cents');
      table.integer('total_price_cents')
    }),
    knex.schema.createTable('reviews', function (table) {
      table.increments();
      table.integer('user_id');
      table.integer('product_id');
      table.integer('rating');
      table.text('description')
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('orders'),
    knex.schema.dropTable('products'),
    knex.schema.dropTable('line_items'),
    knex.schema.dropTable('reviews')]
)};
