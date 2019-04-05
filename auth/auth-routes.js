bcrypt = require('bcryptjs');
router = require('express').Router();
jwt = require('jsonwebtoken');

addUser = require('../users/users-model').addUser;
getUsersByFilter = require('../users/users-model').getUsersByFilter;

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
router.post('/register', (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.departments) {
    return res.status(400).json({
      message:
        'Please include `username`, `password`, and `departments` properties.'
    });
  }
  let newUser = {};
  Object.assign(newUser, req.body);
  console.log('req.body: ', req.body);
  console.log('newUser: ', newUser);
  // delete `password` key because I was dumb and named the column in DB `passHash`
  delete newUser.password;
  // hash that pass
  newUser.passHash = bcrypt.hashSync(req.body.password, 10);
  console.log(newUser);

  addUser(newUser)
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
      if (!storedUser) {
        return res.status(404).json({ message: 'Invalid Credentials!' });
      }
      if (bcrypt.compareSync(password, storedUser.passHash)) {
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
    departments: user.departments.split(' ')
  };
  const options = {
    expiresIn: '12h'
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
