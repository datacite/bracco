/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const pkg = require('./package.json');

  let app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: true
    },
    sourcemaps: {
      enabled: true,
      extensions: ['js']
    },
    babel: {
      sourceMaps: 'inline'
    },
    'ember-service-worker': {
      // Disable the Service Worker
      enabled: false,
      // There are various ways to inject the service worker registration script.
      // By default, the unregistration file is loaded using a simple script tag in the bottom of the body tag
      // async: the unregistration file is loaded using a async script tag in the bottom of the head tag
      // inline: write the contents of the registration script into the index.html file
      registrationStrategy: 'inline',
      // Force to create the unregistration file
      unregistrationEnabled: true
    },
    'ember-bootstrap': {
      importBootstrapCSS: false,
      importBootstrapFont: false,
      bootstrapVersion: 3
    },
    'ember-prism': {
      theme: 'default',
      plugins: ['line-highlight']
    },
    inlineContent: {
      'site-title': {
        content: process.env.SITE_TITLE || 'DataCite Fabrica'
      },
      'cdn-url': {
        content:
          (process.env.CDN_URL || 'https://datacite.org') +
          '/stylesheets/doi.css?version=' +
          (pkg.version || '1.0')
      }
    },
    'ember-power-select': {
      theme: 'bootstrap'
    },
    'ember-math-helpers': {
      only: ['add', 'sub']
    }
  });

  return app.toTree();
};
