var knex = require('knex')({
    client: 'mssql',
    connection: {
      server : 'localhost',
      user: '',
      password : '',
      database : '',
      options: {
        encrypt: false
    },
    }
  });



module.exports = knex