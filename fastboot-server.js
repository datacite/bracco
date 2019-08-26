// from https://github.com/ember-fastboot/fastboot-app-server/issues/65

const FastBootAppServer = require("fastboot-app-server");
const ExpressHTTPServer = require('fastboot-app-server/src/express-http-server');

const httpServer = new ExpressHTTPServer({
  gzip: true,
  chunkedResponse: true
});
const app = httpServer.app;
let server = new FastBootAppServer({
  httpServer: httpServer,
  distPath: 'dist',
  gzip: true,
  chunkedResponse: true
});

server.start();
