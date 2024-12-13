/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = function (defaults) {
  const pkg = require('./package.json');

  let app = new EmberApp(defaults, {
    // Use the polyfill for 'TypeError: _crypto.randomUUID is not a function'
    '@embroider/macros': {
      setConfig: {
        '@ember-data/store': {
          polyfillUUID: true
        },
      },
    },
    minifyCSS: {
      options: { processImport: true }
    },
    'ember-cli-babel': {
      includePolyfill: true
    },
    sourcemaps: {
      enabled: true,
      extensions: ['js']
    },
    babel: {
      // ember-concurrency plugins for ember-power-select upgrade
      plugins: [
        // ... any other plugins
        require.resolve('ember-concurrency/async-arrow-task-transform')
        // NOTE: put any code coverage plugins last, after the transform.
      ],
      sourceMaps: 'inline'
    },
    'ember-bootstrap': {
      insertEmberWormholeElementToDom: false,
      importBootstrapCSS: false,
      bootstrapVersion: 5
    },
    // 'ember-cli-terser': {
    //    enabled: true
    // },
    'ember-prism': {
      theme: 'default',
      plugins: ['line-highlight']
    },
    inlineContent: {
      'site-title': {
        content: process.env.SITE_TITLE || 'DataCite Fabrica'
      },
      'cdn-url': {
        content: process.env.CDN_URL || 'https://assets.datacite.org'
      }
    },
    'ember-power-select': {
      theme: 'bootstrap'
    },
    'ember-math-helpers': {
      only: ['add', 'sub']
    },
    'ember-simple-auth': {
      useSessionSetupMethod: true
    },
    autoImport: {
      forbidEval: true,
      webpack: {
        plugins: [new NodePolyfillPlugin()],
        node: {
          global: true
          // fs: 'empty'
        },
        devtool: 'source-map'
        /*
        resolve: {
          fallback: {
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            timers: require.resolve('timers-browserify'),
            vm: require.resolve('vm-browserify')
          },
          alias: {
            process: 'process/browser'
          }
        }
        */
      }
    }
  });

  return app.toTree();
};
