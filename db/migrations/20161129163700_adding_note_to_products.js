exports.up = function(knex, Promise) {
 return Promise.all([

   knex.schema.dropTable('products'),
   knex.schema.createTable('products', function (table) {
     table.increments();
     table.string('name');
     table.string('description');
     table.float('unit_price');
     table.string('image');
     table.string('note')
   })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([

    knex.schema.dropTable('products'),
    knex.schema.createTable('products', function (table) {
      table.increments();
      table.string('name');
      table.string('description');
      table.float('unit_price');
      table.string('image')
    })
  ]);
};
