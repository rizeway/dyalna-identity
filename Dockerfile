FROM dockerfile/nodejs
COPY ./ /code
WORKDIR /code
RUN cp src/config/config.js.dist src/config/config.js \
  && cp src/config/migration.json.dist src/config/migration.json \
  && npm install
EXPOSE 4000
CMD ./node_modules/.bin/db-migrate up --env production --migrations-dir src/migrations/ --config src/config/migration.json \
  && node src/server.js
