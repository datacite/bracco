/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: true
    },

    'ember-bootstrap': {
      importBootstrapCSS: false,
      whitelist: ['bs-popover',
                  'bs-collapse',
                  'bs-accordion',
                  'bs-button',
                  'bs-button-group',
                  'bs-alert',
                  'bs-dropdown',
                  'bs-modal',
                  'bs-nav']
    },

    'ember-prism': {
      'theme': 'default'
    },

    dotEnv: {
      clientAllowedKeys: ['SITE_TITLE',
                          'NAVMENU_TITLE',
                          'SEARCH_URL',
                          'ORCID_URL',
                          'API_URL',
                          'USER_API_URL',
                          'DATA_URL',
                          'CDN_URL',
                          'JWT_HOST',
                          'JWT_PUBLIC_KEY',
                          'BUGSNAG_API_KEY']
    },

    inlineContent: {
      'site-title' : {
        content: (process.env.SITE_TITLE || "DataCite DOI Registration Service")
      },
      'cdn-url' : {
        content: (process.env.CDN_URL || "https://assets.datacite.org")
      }
    },

    'ember-bootstrap': {
      'bootstrapVersion': 3,
      'importBootstrapFont': true,
      'importBootstrapCSS': true
    },

    'ember-power-select': {
      'theme': 'bootstrap'
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
