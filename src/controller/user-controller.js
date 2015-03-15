module.exports = function() {
  return {
    meAction: function(req, res) {
      res.send(req.security.user);
    }
  };
};
