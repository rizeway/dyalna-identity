module.exports = function(_, featuresConfig) {

  return {
    process: function(user, account) {
      var features = [];
      var plan = (account.expire < new Date()) ? 'free' : account.plan;
      Object.keys(featuresConfig).forEach(function(feature) {
        var config = featuresConfig[feature];
        var hasFeature = true;
        if (config.roles && _.intersection(user.roles.split(','), config.roles).length === 0) {
          hasFeature = false;
        }
        if (config.plans && config.plans.indexOf(plan, config.plans) === -1) {
          hasFeature = false;
        }
        if (hasFeature) {
          features.push(feature);
        }
      });

      return features;
    }
  };
};
