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
