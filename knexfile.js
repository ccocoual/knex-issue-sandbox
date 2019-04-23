global.Promise = require('bluebird');

const mssqlConfigs = {
  client: 'mssql',
  connection: {
    user: 'sa',
    password: 'Allo123456',
    server: 'localhost',
    database: 'Database1',
  },
  migrations: {
    tableName: 'migrations',
    directory: './migrations',
  },
  debug: true,
  disableTransactions: true,
};

module.exports = {
  development: mssqlConfigs,
  production: mssqlConfigs,
};
