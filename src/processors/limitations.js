module.exports = function(limitationsConfig) {

  return {
    process: function(account) {
      var limitations = {};
      var plan = (account.expire < new Date()) ? 'free' : account.plan;
      Object.keys(limitationsConfig).forEach(function(limitation) {
        var config = limitationsConfig[limitation];
        limitations[limitation] = config[plan];
      });

      return limitations;
    }
  };
};
