module.exports = function(securityHeaderName, db, featuresProcessor, limitationsProcessor) {
  return function(req, res, next) {

    req.security = { authenticated: false };
    if (req.headers[securityHeaderName] === undefined) {
      return next();
    }

    var securityHeaderValue = req.get(securityHeaderName);
    db.Session.find({ where: { token: securityHeaderValue } }).then(function(session) {
      if (null === session) {
        return next();
      }
      db.User.find({ where: { username: session.username } }).then(function(user) {
        if (null === user) {
          return next();
        }
        db.Account.find(user.account).then(function(account) {
          var securityUser = {
            username: user.username,
            roles: user.roles,
            features: featuresProcessor.process(user, account),
            limitations: limitationsProcessor.process(account),
            account: user.account
          };
          req.security = { authenticated: true, user: securityUser, session: session };
          next();
        }, next);
      }, next);
    }, next);
  };
};
