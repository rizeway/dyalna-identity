Dyalna Identity
===============

Simple SSO Authentication/Authorization Server

Why
---

Dyalna Identity is meant to be a standalone SSO Authentication / Authorisation and Licensing serveur with this built-in features :

 * Handling User Authentication
 * Handling User Subscription
 * Handling Features authorization depending on user roles and on accounts plans
 * Handling Fautres Limitations depending on accounts plans
 * Handling Password Loss And Password edition

Principles
----------

 * Each User has roles
 * A User belongs to an account
 * Each account has a plan (free, premium, custom etc...)

Installation
------------

 * git clone https://github.com/rizeway/dyalna-identity.git && cd dyalna-identity
 * npm install
 * Copy src/config/config.json.dist to src/config/config.json and edit the database parameters
 * Copy src/config/config.js.dist to src/config/config.js and edit your features, and limitations depending on user roles and plans.
 * Create the database
 * Migrate the database `./node_modules/.bin/sequelize db:migrate --config src/config/config.json --migrations-path src/migrations --models-path models-path --env production`
 * launch the server `node src/server.js`

TODO
----

 * session expiration management
