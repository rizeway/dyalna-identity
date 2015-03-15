module.exports = function() {
  return function(req, res, next) {
    if (!req.security.authenticated) {
      res.status(401).send('Authentication required');
    } else {
      next();
    }
  };
};
