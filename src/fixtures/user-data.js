module.exports = function(db) {

  return {
    create: function() {
      db.Account.count ().then(function (count) {
        if (count === 0) {
          db.Account.create({
            name: 'rizeway',
            plan: 'rizeway',
            expire: new Date()
          }).then(function(account) {
            db.User.create({
              username: 'admin',
              password: 'admin',
              email: 'admin@example.com',
              roles: ['superadmin'],
              account: account.id,
              main: true
            });
          });
        }
      });
    }
  };
};
