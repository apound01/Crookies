exports.seed = function(knex, Promise) {
  return knex('products').del()
    .then(function () {
      return Promise.all([
        knex('products').insert({
          id: 1,
          name: 'Santa Crookie',
          description: 'Our classic Christmas Crookie, Jolly Old Saint Nick baked with our finest Quebec blue cheese and anchovies.',
          unit_price: 2.99,
          image: "http://wholisticfitliving.com/wp-content/uploads/2012/12/santa-cookies1.jpg"
        }),
        knex('products').insert({
          id: 2,
          name: 'Santa Crookie',
          description: 'Our classic Christmas Crookie, Jolly Old Saint Nick baked with our finest Quebec blue cheese and anchovies.',
          unit_price: 2.99,
          image: "http://wholisticfitliving.com/wp-content/uploads/2012/12/santa-cookies1.jpg"
        }),
        knex('products').insert({
          id: 3,
          name: 'Santa Crookie',
          description: 'Our classic Christmas Crookie, Jolly Old Saint Nick baked with our finest Quebec blue cheese and anchovies.',
          unit_price: 2.99,
          image: "http://wholisticfitliving.com/wp-content/uploads/2012/12/santa-cookies1.jpg"
        }),
        knex('products').insert({
          id: 4,
          name: 'Santa Crookie',
          description: 'Our classic Christmas Crookie, Jolly Old Saint Nick baked with our finest Quebec blue cheese and anchovies.',
          unit_price: 2.99,
          image: "http://wholisticfitliving.com/wp-content/uploads/2012/12/santa-cookies1.jpg"
        }),
        knex('products').insert({
          id: 5,
          name: 'Santa Crookie',
          description: 'Our classic Christmas Crookie, Jolly Old Saint Nick baked with our finest Quebec blue cheese and anchovies.',
          unit_price: 2.99,
          image: "http://wholisticfitliving.com/wp-content/uploads/2012/12/santa-cookies1.jpg"
        }),
        knex('products').insert({
          id: 6,
          name: 'Gingerbread Man Crookie',
          description: 'A holiday favourite, these adorable little ginger bread men will put a instant grin on your face when you taste our blend of Dijon mustard and Australian vegemite. Yum!',
          unit_price: 2.99,
          image: "http://cookdiary.net/wp-content/uploads/images/Gingerbread-Cookies.jpg"
        })
      ]);
    });

};
