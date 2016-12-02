exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('products').del(),
    knex('products').insert({
      id: 1,
      name: 'Spicy Santa',
      description: 'Our classic Christmas Crookie, sriracha sauce, freshly picked juicy beets.', // make better
      unit_price: 2.99,
      image: "/images/xmas-santa.jpg",
      ingredients: "SRIRACHA SAUCE, BEETS & MAPLE SYRUP"
    }),
    knex('products').insert({
      id: 2,
      name: 'Salty Snowman',
      description: "Ever crunched into a grain of salt after putting to much in your holiday pasta? Horrendous. That's exactly what this premium crookie tastes like, but worse...",
      unit_price: 2.99,
      image: "/images/xmas-snowman.jpg",
      ingredients: "SEA SALT, VINEGAR & CUMIN"
    }),
    knex('products').insert({
      id: 3,
      name: 'elFISH',
      description: 'Elves can be very mischivious, sometimes by duping unsuspecting victims by handing them these crookies baked with rotten fish, ketchup & cinnamon to hide the smell.',
      unit_price: 2.99,
      image: "/images/xmas-elf.jpg",
      ingredients: "ROTTEN FISH, KETCHUP & CINNAMON"
    }),
    knex('products').insert({
      id: 4,
      name: 'The Dirty Stocking',
      description: "We all know the joy, upon Christmas morn, of running downstairs to our Christmas tree to find our stocking full of chocolate goodness. Take one out to satisfy our hearts desire and sink our teeth in it. But oh! This isn't chocolate no! No!",
      unit_price: 2.99,
      image: "/images/xmas-stocking.jpg",
      ingredients: "GINGER, BLACK TEA & WORCESTERSHIRE SAUCE"
    }),
    knex('products').insert({
      id: 5,
      name: 'Chili Trees',
      description: 'Every Christmas your children try to be sneaky and steal a chocolate from under the Christmas tree, but not this year! With these spicy pine tree crookies they will think twice next year!',
      unit_price: 2.99,
      image: "/images/xmas-tree.jpg",
      ingredients: "CHILI PEPPERS & FRENCH VANILLA"
    }),
    knex('products').insert({
      id: 6,
      name: 'Cheeky Rudolph',
      description: 'Rudolph has been extra cheeky this year, playing dirty tricks on all then elves in the north. Here are some of his best concuctions.',
      unit_price: 2.99,
      image: "/images/xmas-reindeer.jpg",
      ingredients: "OLIVES, GARLIC & MARMITE"
    }),
    knex('products').insert({
      id: 7,
      name: 'Yellow Snowflake',
      description: "Don't let the pretty icing exterior fool you, on the inside we've prepared a succulent mash of crickets, lemon and dijon mustard.",
      unit_price: 2.99,
      image: "/images/xmas-snowflake.jpg",
      ingredients: "CRICKETS, LEMON & DIJON MUSTARD"
    }),
    knex('products').insert({
      id: 8,
      name: 'Big Mean Gingerman',
      description: 'A holiday favourite, these adorable little ginger bread men will put a instant grin on your face when you taste our blend of Dijon mustard and Australian vegemite. Yum!',
      unit_price: 2.99,
      image: "/images/xmas-gingerman.jpg",
      ingredients: "DIJON MUSTARD & VEGEMITE"
    }),
    knex('products').insert({
      id: 9,
      name: "Belsnickel's Sleigh",
      description: "Santa's evil cousin has come to town with crooked cookies to fool all the boys and girls that have been bad this year.",
      unit_price: 2.99,
      image: "/images/xmas-sleigh.jpg",
      ingredients: "PICKLES, NUTELLA & EGGS"
    }),
    knex('products').insert({
      id: 10,
      name: 'Custom XXXtra Spicy Crookie',
      description: 'A funky blend of Indian ghost peppers, tabasco sauce and wasabi mix perfectly to create an unforgettable mouthful.',
      unit_price: 4.99,
      image: "/images/customizable-cookie.png",
      ingredients: "GHOST PEPPERS, TABASCO SAUCE & WASABI"
    }),

    knex('products').insert({
      id: 11,
      name: 'Custom Salty Crunch Crookie',
      description: "A holiday classic, running along a perfectly white sandy beach towards the loving arms of a mother. But just as you close in, you trip! Head first into the sand, now with a mouthful of crunchy minerals. Wake up. It's actually a crookie.",
      unit_price: 4.99,
      image: "/images/customizable-cookie.png",
      ingredients: "SEA SALT, SOY SAUCE & CHOCOLATE"
    }),
    knex('products').insert({
      id: 12,
      name: 'Custom Super Sour Crookie',
      description: 'Sour like biting 5 lemons all at once with another lemon on top.',
      unit_price: 4.99,
      image: "/images/customizable-cookie.png",
      ingredients: "LEMON, UZU & BLACK PEPPERS"
    })
  ]);
};
