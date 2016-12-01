exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('line_items').del(),
    knex('products').del(),
    knex('reviews').del(),
    knex('orders').del(),

    knex('products').insert({
      id: 1,
      name: 'Chilly Trees',
      description: '',
      unit_price: 4.99,
      image: "/images/xmas-tree.jpg",
      ingredients: ""
    }),
    knex('products').insert({
      id: 2,
      name: 'elFISH',
      description: '',
      unit_price: 2.99,
      image: "/images/xmas-elf.jpg",
      ingredients: ""
    }),
    knex('products').insert({
      id: 3,
      name: 'The Dirty Stocking',
      description: 'A holiday favourite, these adorable little ginger bread men will put a instant grin on your face when you taste our blend of Dijon mustard and Australian vegemite. Yum!',
      unit_price: 2.99,
      image: "/images/xmas-stocking.jpg",
      ingredients: ""
    }),
    knex('products').insert({
      id: 4,
      name: 'Gingerbread Man Crookie',
      description: 'A holiday favourite, these adorable little ginger bread men will put a instant grin on your face when you taste our blend of Dijon mustard and Australian vegemite. Yum!',
      unit_price: 2.99,
      image: "/images/xmas-gingerman.jpg",
      ingredients: ""
    }),
    knex('products').insert({
      id: 5,
      name: 'Gingerbread Man Crookie',
      description: 'A holiday favourite, these adorable little ginger bread men will put a instant grin on your face when you taste our blend of Dijon mustard and Australian vegemite. Yum!',
      unit_price: 2.99,
      image: "/images/xmas-reindeer.jpg",
      ingredients: ""
    }),
    knex('products').insert({
      id: 6,
      name: 'Gingerbread Man Crookie',
      description: 'A holiday favourite, these adorable little ginger bread men will put a instant grin on your face when you taste our blend of Dijon mustard and Australian vegemite. Yum!',
      unit_price: 2.99,
      image: "/images/xmas-snowflake.jpg",
      ingredients: ""
    }),
    knex('products').insert({
      id: 7,
      name: 'Gingerbread Man Crookie',
      description: 'A holiday favourite, these adorable little ginger bread men will put a instant grin on your face when you taste our blend of Dijon mustard and Australian vegemite. Yum!',
      unit_price: 2.99,
      image: "/images/xmas-sleigh.jpg",
      ingredients: ""
    }),
    knex('products').insert({
      id: 8,
      name: 'Custom XXXtra Spicy Crookie',
      description: 'A funky blend of Indian ghost peppers, tabasco sauce and wasabi mix perfectly to create an unforgettable mouthful.',
      unit_price: 4.99,
      image: "/images/customizable-cookie.png",
      ingredients: "Ghost peppers, tabasco sauce, wasabi."
    }),
    knex('products').insert({
      id: 9,
      name: 'Spicy Santa',
      description: 'Our classic Christmas Crookie, sriracha sauce, freshly picked juicy beets,',
      unit_price: 2.99,
      image: "/images/xmas-santa.jpg",
      ingredients: ""
    }),
    knex('products').insert({
      id: 10,
      name: 'Salty Snowman',
      description: 'A holiday favourite, these adorable little ginger bread men will put a instant grin on your face when you taste our blend of Dijon mustard and Australian vegemite. Yum!',
      unit_price: 2.99,
      image: "/images/xmas-snowman.jpg",
      ingredients: ""
    }),
    knex('products').insert({
      id: 11,
      name: 'Custom Salty Crunch Crookie',
      description: 'Our saltiest crookie to date, the coarsest french sea salt, soy sauce and chocolate. Surprise guaranteed!',
      unit_price: 4.99,
      image: "/images/customizable-cookie.png",
      ingredients: "French sea salt, soy sauce & chocolate."
    }),
    knex('products').insert({
      id: 12,
      name: 'Custom Super Sour Crookie',
      description: 'A holiday favourite, these adorable little ginger bread men will put a instant grin on your face when you taste our blend of Dijon mustard and Australian vegemite. Yum!',
      unit_price: 4.99,
      image: "/images/customizable-cookie.png",
      ingredients: ""
    })
  ]);
};
