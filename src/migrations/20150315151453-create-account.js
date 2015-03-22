module.exports = {
  up: function(db, done) {
    db.createTable('Accounts', {
      id: {
        notNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: 'int'
      },
      name: {
        type: 'string',
        unique: true
      },
      plan: {
        type: 'string'
      },
      expireAt: {
        type: 'date'
      },
      createdAt: {
        notNull: true,
        type: 'date'
      },
      updatedAt: {
        notNull: true,
        type: 'date'
      }
    }, done);
  },
  down: function(db, done) {
    db.dropTable('Accounts', done);
  }
};
