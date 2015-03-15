//Vendor
var _ = require('lodash');
var uuid = require('node-uuid');
var bodyParser = require('body-parser');

// Config
var config = require('./config/config');

// Mongo
var db = require('./models');

// Features
var FeaturesProcessor = require('./processors/features');
var LimitationsProcessor = require('./processors/limitations');
var featuresProcessor = new FeaturesProcessor(_, config.features);
var limitationsProcessor = new LimitationsProcessor(config.limitations);

// Middlewares
var AuthenticationMiddleware = require('./middleware/authentication');
var AuthorizationMiddleware = require('./middleware/authorization');
var SecurityMiddleware = require('./middleware/security');
var middlewares = {
  authentication: new AuthenticationMiddleware(),
  security: new SecurityMiddleware(config.securityTokenName, db, featuresProcessor, limitationsProcessor),
  authorization: AuthorizationMiddleware,
  bodyParser: bodyParser
};

// Fixtures
var UserData = require('./fixtures/user-data');
var fixtures = {
  user: new UserData(db)
};

// Controllers
var UserController = require('./controller/user-controller');
var AccountController = require('./controller/account-controller');
var SecurityController = require('./controller/security-controller');
var controllers = {
  userController: new UserController(),
  securityController: new SecurityController(uuid, db),
  accountController: new AccountController(db)
};

module.exports = {
  middlewares: middlewares,
  controllers: controllers,
  fixtures: fixtures,
  db: db,
  config: config
};
