/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: true
    },
    'ember-fetch': {
      preferNative: true
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
    'ember-power-select': {
      theme: 'bootstrap'
    },
    'ember-math-helpers': {
      only: ['add', 'sub']
    }
  });

  return app.toTree();
};
