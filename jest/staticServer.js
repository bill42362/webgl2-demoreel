// staticServer.js
'use strict';
const path = require('path');
const Express = require('express');
const Helmet = require('helmet');
const debug = require('debug')('web-server:root');

const server = new Express();
server.use(Helmet());
server.use((request, response, next) => {
  debug('request.url: %s', request.url);

  // service worker precache of js files are buggy on google cloud build selenium.
  if (/\.js\?_sw-precache=/gi.test(request.url)) {
    response.status(404).end();
  }

  next();
});

server.use(Express.static(`${__dirname}/../dist/client`));
server.get('/:filename.html', ({ params }, response) => {
  response.sendFile(
    path.resolve(__dirname, `../dist/client/html/${params.filename}.html`)
  );
});
server.get('/', (request, response) =>
  response.sendFile(path.resolve(__dirname, '../dist/client/html/index.html'))
);
server.use('/*', Express.static(`${__dirname}/../dist/client/html/index.html`));

module.exports = port =>
  server.listen(port, () => console.log(`Server is listening ${port} port.`));
