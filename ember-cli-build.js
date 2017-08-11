/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: true
    },
    dotEnv: {
      clientAllowedKeys: ['SITE_TITLE',
                          'NAVMENU_TITLE',
                          'SEARCH_URL',
                          'ORCID_URL',
                          'CDN_HOST',
                          'JWT_HOST',
                          'JWT_PUBLIC_KEY']
    },
    inlineContent: {
      'site-title' : {
        content: (process.env.SITE_TITLE || "DataCite DOI Registration")
      },
      'cdn-url' : {
        content: (process.env.CDN_URL || "https://assets.datacite.org")
      }
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
