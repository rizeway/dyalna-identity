module.exports = {
  up: function(db, done) {
    db.createTable('Users', {
      id: {
        notNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: 'int'
      },
      username: {
        type: 'string',
        unique: true
      },
      password: {
        type: 'string'
      },
      email: {
        type: 'string',
        unique: true
      },
      main: {
        type: 'boolean'
      },
      account: {
        type: 'int'
      },
      roles: {
        type: 'text'
      },
      active: {
        type: 'boolean',
        defaultValue: false
      },
      activationCode: {
        type: 'string',
        unique: true
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
    db.dropTable('Users', done);
  }
};
