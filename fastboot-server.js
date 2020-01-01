/* global PhusionPassenger, require */

if (typeof(PhusionPassenger) !== 'undefined') {
  PhusionPassenger.configure({ autoInstall: false });
}

const express = require('express');
const compression = require('compression');
const morgan  = require('morgan');
const fastbootMiddleware = require('fastboot-express-middleware');

let app = express();

// compress responses
app.use(compression());

// handle assets
app.use(express.static('dist'));
app.get('/assets/*', function(req, res) {
  res.sendStatus(404);
});

// logging
app.use(morgan('combined'));

app.get('/*', fastbootMiddleware({
  distPath: 'dist',
  resilient: true,
  chunkedResponse: true,
}));

if (typeof(PhusionPassenger) !== 'undefined') {
  app.listen('passenger');
} else {
  app.listen(3000);
}
