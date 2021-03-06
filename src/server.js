var container = require('./container');
var express = require('express');
var app = express();

app.use(container.middlewares.bodyParser.json());
app.use(container.middlewares.bodyParser.urlencoded({ extended: true }));
app.use(container.middlewares.security);
app.get('/', function (req, res) {
  res.send('Dyalna Identity Running ...');
});

// User
app.get('/me', container.middlewares.authentication, container.controllers.userController.meAction);
app.put('/changePassword', container.middlewares.authentication, container.controllers.userController.changePasswordAction);
app.post('/register', container.controllers.userController.registerAction);
app.put('/lostPassword', container.controllers.userController.lostPasswordAction);
app.put('/regeneratePassword', container.controllers.userController.regeneratePasswordAction);
app.get('/activate', container.controllers.userController.activateAction);
app.get('/user', new container.middlewares.authorization(['admin']), container.controllers.userController.findAction);

// Security
app.post('/login', container.controllers.securityController.loginAction);
app.get('/logout', container.middlewares.authentication, container.controllers.securityController.logoutAction);

// Account
app.get('/account/:name', container.controllers.accountController.findOneAction);

// Loading Fixtures
container.fixtures.user.create();

// Running
app.listen(container.config.port);
console.log('Dyalna Identity Server running on Port %s', container.config.port);
