const db = require('../data/dbConfig');

module.exports = {
  addUser,
  getAllUsers,
  getUsersByFilter
};

async function addUser(user) {
  const [id] = await db('users').insert(user);
  return getUsersByFilter({ id }).first();
}

function getAllUsers() {
  return db('users').select('id', 'username', 'passHash');
}

function getUsersByFilter(filter) {
  return db('users')
    .select()
    .where(filter);
}
