/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = async function (defaults) {
  const pkg = require('./package.json');
  const { setConfig } = await import('@warp-drive-mirror/build-config');

  let app = new EmberApp(defaults, {
    'ember-fetch': {
      preferNative: true
    },
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
    },
    emberData: {
      features: {
        /*
      SAMPLE_FEATURE_FLAG: false // utliize existing behavior, strip code for the new feature
      OTHER_FEATURE_FLAG: true // utilize this new feature, strip code for the older behavior
      */
      },
      /* Temporary - for debugging purposes. */
      debug: {
        LOG_PAYLOADS: false, // data store received to update cache with
        LOG_OPERATIONS: false, // updates to cache remote state
        LOG_MUTATIONS: false, // updates to cache local state
        LOG_NOTIFICATIONS: false,
        LOG_REQUESTS: false,
        LOG_REQUEST_STATUS: false,
        LOG_IDENTIFIERS: false,
        LOG_GRAPH: false,
        LOG_INSTANCE_CACHE: false
      }
    }
  });

  setConfig(app, __dirname, {
    deprecations: {
      ENABLE_LEGACY_SCHEMA_SERVICE: true
      /*
      DEPRECATE_EMBER_INFLECTOR: false 
      */
    }
  });

  return app.toTree();
};
