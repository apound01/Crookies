exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          id: 1,
          username: 'AmyP',
          email: 'amy@test.com',
          password: 'p1nk',
          admin: true}),
        knex('users').insert({
          id: 2, 
          username: 'gman',
          email: 'g@g.com',
          password: 'gman',
          admin: true}),
      ]);
    });
};
