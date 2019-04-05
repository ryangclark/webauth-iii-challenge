knex = require('knex');
knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

module.exports = db;