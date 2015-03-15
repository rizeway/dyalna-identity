module.exports = function(db) {

  return {
    findOneAction: function(req, res) {
      db.account.find({ where: { name: req.params.name } }).then(function(account) {
        res.send({ status: 'success', data: account });
      }, function() {
        res.status(404).send({ status: 'error', message : 'document not found' });
      });
    }
  };
};
