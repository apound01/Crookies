exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('line_items').del(),
    knex('products').del(),
    knex('reviews').del(),
    knex('orders').del(),
    knex('products').insert({
      name: 'Santa Crookie',
      description: 'Our classic Christmas Crookie, Jolly Old Saint Nick baked with our finest Quebec blue cheese and anchovies.',
      unit_price: 2.99,
      image: "/images/santa-cookies.jpg"
    }),
    knex('products').insert({
      name: 'Gingerbread Man Crookie',
      description: 'A holiday favourite, these adorable little ginger bread men will put a instant grin on your face when you taste our blend of Dijon mustard and Australian vegemite. Yum!',
      unit_price: 2.99,
      image: "/images/gingerbread-man.jpg"
    }),
    knex('products').insert({
      name: 'Extra Spicy Crookie',
      description: 'A funky blend of tabasco sauce and wasabi perfectly mixed to create an unforgettable mouthful.',
      unit_price: 4.99,
      image: "/images/customizable-cookie.png"
    }),
    knex('products').insert({
      name: 'Extra Salty Crookie',
      description: 'Our saltiest crookie to date, the finest french sea salt, soy sauce and chocolate. Guaranteed surprise!',
      unit_price: 4.99,
      image: "/images/customizable-cookie.png"
    }),
  ]);
};
