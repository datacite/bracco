if (typeof(PhusionPassenger) !== 'undefined') {
  PhusionPassenger.configure({ autoInstall: false });
}

const express = require('express');
const compression = require('compression')
const fastbootMiddleware = require('fastboot-express-middleware');

let app = express();

// compress responses
app.use(compression());

app.get('/*', fastbootMiddleware({
  distPath: 'dist',
  resilient: true,
  chunkedResponse: true
}));

if (typeof(PhusionPassenger) !== 'undefined') {
  app.listen('passenger');
} else {
  app.listen(3000);
}
