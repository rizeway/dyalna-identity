module.exports = function(db, uuid, confirmationMailer) {
  return {
    meAction: function(req, res) {
      res.send(req.security.user);
    },

    subscribeAction: function(req, res) {
      db.Account.create({
        name: req.body.username,
        plan: 'default'
      }).then(function(account) {
        return db.User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          account: account.id,
          main: true,
          roles: ['user'],
          active: false,
          activationCode: uuid.v1()
        });
      }).then(function(user) {
        return confirmationMailer.send(user);
      }).then(function() {
        res.send({ status: 'ok' });
      }, function() {
        res.status(500).send({ status: 'error' });
      });
    },

    activateAction: function(req, res) {
      db.User.find({ where: { activationCode: req.query.token } }).then(function(user) {
        user.active = true;
        return user.save();
      }).then(function() {
        res.send({ status: 'ok' });
      }, function() {
        res.status(500).send({ status: 'error' });
      });
    },
  };
};