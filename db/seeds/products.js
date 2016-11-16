exports.seed = function(knex, Promise) {
  return knex('products').del()
    .then(function () {
      return Promise.all([
        knex('products').insert({
          id: 1,
          name: 'Santa Crookie',
          description: 'Our classic Christmas Crookie, Jolly Old Saint Nick baked with our finest Quebec blue cheese and anchovies.',
          unit_price: 299,
          image: "/seed_assets/santa-cookies.jpg"
        }),
        knex('products').insert({
          id: 2,
          name: 'Gingerbread Man Crookie',
          description: 'A holiday favourite, these adorable little ginger bread men will put a instant grin on your face when you taste our blend of Dijon mustard and Australian vegemite.',
          unit_price: 299,
          image: "/seed_assets/gingerbread-man.jpg"
        })
      ]);
    });

};
