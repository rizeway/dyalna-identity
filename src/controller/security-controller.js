module.exports = function(uuid, db) {

  return {
    loginAction: function(req, res) {
      db.User.find({ where: {
        username: req.body.username,
        password: req.body.password,
        active: true
      } }).then(function(user) {
        if (!user) {
          res.status(401).send({ status: 'error', message: 'Invalid credentials' });
        } else {
          db.Session.create({
            username: user.username,
            token: uuid.v1()
          }).then(function(session) {
            res.send({ token: session.token });
          }, function() {
            return res.status(500).send({ status: 'error', message : 'database error' });
          });
        }
      }, function() {
        res.status(401).send({ status: 'error', message: 'Invalid credentials' });
      });
    },

    logoutAction: function(req, res) {
      req.security.session.destroy().then(function() {
        return res.send({ status: 'success', message: 'Logout success' });
      }, function() {
        return res.status(500).send({ status: 'error', message : 'database error' });
      });
    }
  };
};
