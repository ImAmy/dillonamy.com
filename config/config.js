/**
 * Config.
 */

module.exports = {
  development: {
    port: 3060,
    db: 'mongodb://127.0.0.1:27017/dillonamy'
  },
  staging: {
    port: 3030,
    db: 'mongodb://127.0.0.1:27017/dillonamy'
  },
  production: {
    port: 3000,
    db: 'mongodb://127.0.0.1:27017/dillonamy'
  }
};
