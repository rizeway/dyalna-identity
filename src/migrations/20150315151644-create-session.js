module.exports = {
  up: function(db, done) {
    db.createTable('Sessions', {
      id: {
        notNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: 'int'
      },
      username: {
        type: 'string'
      },
      token: {
        type: 'string',
        unique: true
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
    db.dropTable('Sessions', done);
  }
};
