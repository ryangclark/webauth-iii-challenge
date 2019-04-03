import { Router } from 'express';

import { getAllUsers } from './users-model';

const router = Router();

function handleServerError(res, error) {
  console.error(error);
  return res
    .status(500)
    .json({ message: 'The request could not be completed.', error: error });
}

/** GET /api/users
 * If the user is logged in, respond with an array
 * of all the users contained in the database.
 * If the user is not logged in respond with
 * the correct status code and the message:
 * 'You shall not pass!'.
 * Use this endpoint to verify that the password
 * is hashed before it is saved.
 */
router.get('/', (req, res) => {
  return getAllUsers()
    .then(userList => res.status(200).json(userList))
    .catch(error => handleServerError(res, error));
});
