import jwt from 'jsonwebtoken';

function bouncer(req, res, next) {
  const token = req.headers.authorization || null;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        return res.status(401).json({ message: 'Invalid Credentials.' });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided ' });
  }
}

export default bouncer;