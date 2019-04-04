function withDepartment(departments) {
  if (typeof departments === 'string') {
    args = [].concat(Array.from(arguments));
  } else if (Array.isArray(keys)) {
    args = departments;
  } else {
    throw new Error(
      'withDepartment takes a single array or one or more strings.'
    );
  }
  return function(req, res, next) {
    for (let department of req.decodedJwt.departments) {
      if (args.includes(department)) {
        return next();
      }
    }
    res.status(401).json({ message: 'Invalid Department Credentials' });
  };
}

module.exports = withDepartment;
