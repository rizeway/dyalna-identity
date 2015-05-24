var path           = require('path');

//Vendor
var _ = require('lodash');
var uuid = require('node-uuid');
var bodyParser = require('body-parser');
var emailTemplates = require('email-templates');
var nodemailer = require('nodemailer');
var Q = require('q');

// Config
var config = require('./config/config');
var templatesDirectory = path.resolve(__dirname, 'templates');

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

// Mailer
var ConfirmationMailer = require('./mailer/confirmation-mailer');
var LostPasswordMailer = require('./mailer/lost-password-mailer');
var RegeneratePasswordMailer = require('./mailer/regenerate-password-mailer');
var confirmationMailer = new ConfirmationMailer(Q, nodemailer, emailTemplates, config.mailer, templatesDirectory);
var lostPasswordMailer = new LostPasswordMailer(Q, nodemailer, emailTemplates, config.mailer, templatesDirectory);
var regeneratePasswordMailer = new RegeneratePasswordMailer(Q, nodemailer, emailTemplates, config.mailer, templatesDirectory);

// Controllers
var UserController = require('./controller/user-controller');
var AccountController = require('./controller/account-controller');
var SecurityController = require('./controller/security-controller');
var controllers = {
  userController: new UserController(db, uuid, confirmationMailer, lostPasswordMailer, regeneratePasswordMailer),
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
