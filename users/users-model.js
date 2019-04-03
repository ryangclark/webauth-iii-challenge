const db = require('../data/dbConfig').default;

// module.exports = {
//   addUser,
//   getAllUsers,
//   getUsersByFilter
// };

export async function addUser(user) {
  const [id] = await db('users').insert(user);
  return getUsersByFilter({ id }).first();
}

export function getAllUsers() {
  return db('users').select('id', 'username', 'password');
}

export function getUsersByFilter(filter) {
  return db('users')
    .select()
    .where(filter);
}
