exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('line_items').del(),
    knex('products').del(),
    knex('reviews').del(),
    knex('orders').del(),
    knex('products').insert({
      name: 'Extra Spicy Crookie',
      description: 'A funky blend of tabasco sauce and wasabi blend perfectly together to create a unforgettable mouthful.',
      unit_price: 2.99,
      image: "http://wholisticfitliving.com/wp-content/uploads/2012/12/santa-cookies1.jpg"
    }),
    knex('products').insert({
      name: 'Santa Crookie',
      description: 'Our classic Christmas Crookie, Jolly Old Saint Nick baked with our finest Quebec blue cheese and anchovies.',
      unit_price: 2.99,
      image: "http://wholisticfitliving.com/wp-content/uploads/2012/12/santa-cookies1.jpg"
    }),
    knex('products').insert({
      name: 'Santa Crookie',
      description: 'Our classic Christmas Crookie, Jolly Old Saint Nick baked with our finest Quebec blue cheese and anchovies.',
      unit_price: 2.99,
      image: "http://wholisticfitliving.com/wp-content/uploads/2012/12/santa-cookies1.jpg"
    }),
    knex('products').insert({
      name: 'Santa Crookie',
      description: 'Our classic Christmas Crookie, Jolly Old Saint Nick baked with our finest Quebec blue cheese and anchovies.',
      unit_price: 2.99,
      image: "http://wholisticfitliving.com/wp-content/uploads/2012/12/santa-cookies1.jpg"
    }),
    knex('products').insert({
      name: 'Santa Crookie',
      description: 'Our classic Christmas Crookie, Jolly Old Saint Nick baked with our finest Quebec blue cheese and anchovies.',
      unit_price: 2.99,
      image: "http://wholisticfitliving.com/wp-content/uploads/2012/12/santa-cookies1.jpg"
    }),
    knex('products').insert({
      name: 'Santa Crookie',
      description: 'Our classic Christmas Crookie, Jolly Old Saint Nick baked with our finest Quebec blue cheese and anchovies.',
      unit_price: 2.99,
      image: "http://wholisticfitliving.com/wp-content/uploads/2012/12/santa-cookies1.jpg"
    }),
    knex('products').insert({
      name: 'Santa Crookie',
      description: 'Our classic Christmas Crookie, Jolly Old Saint Nick baked with our finest Quebec blue cheese and anchovies.',
      unit_price: 2.99,
      image: "http://wholisticfitliving.com/wp-content/uploads/2012/12/santa-cookies1.jpg"
    }),
    knex('products').insert({
      name: 'Gingerbread Man Crookie',
      description: 'A holiday favourite, these adorable little ginger bread men will put a instant grin on your face when you taste our blend of Dijon mustard and Australian vegemite. Yum!',
      unit_price: 2.99,
      image: "http://cookdiary.net/wp-content/uploads/images/Gingerbread-Cookies.jpg"
    })
  ]);
};
