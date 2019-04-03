import bcrypt from 'bcryptjs';
import { Router } from 'express';
import jwt from 'jsonwebtoken';

import { addUser, getUsersByFilter } from '../users/users-model';

const router = Router();

function handleServerError(res, error) {
  console.error(error);
  return res
    .status(500)
    .json({ message: 'The request could not be completed.', error: error });
}

/** POST /api/auth/register
 * Creates a user using the information
 * sent inside the body of the request.
 * Hash the password before saving the user to the database.
 */
router.post('register', (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.department) {
    return res.status(400).json({
      message:
        'Please include `username`, `password`, and `department` properties.'
    });
  }
  let newUser = req.body;
  // hash that pass
  newUser.password = bcrypt.hashSync(newUser.password, 12);

  addUser(req.body)
    .then(addedUser => res.status(201).json(addedUser))
    .catch(error => handleServerError(res, error));
});

/** POST /api/auth/login
 * Use the credentials sent inside the
 * body to authenticate the user.
 * On successful login, create a new JWT
 * with the user id as the subject and send
 * it back to the client.
 * If login fails, respond with the correct status
 * code and the message: 'You shall not pass!'
 */
router.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: 'Please include `username` and `password` properties.'
    });
  }
  const { username, password } = req.body;

  getUsersByFilter({ username })
    .first()
    .then(storedUser => {
      if (bcrypt.compareSync(password, storedUser.password)) {
        const token = generateToken(storedUser);

        return res
          .status(201)
          .json({ message: `Welcome, ${storedUser.username}!`, token });
      } else {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => handleServerError(res, error));
});

// Generate JWT for given `user`
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    departments: user.departments
  };
  const options = {
    expiresIn: '12h'
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

export default router;
