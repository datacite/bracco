/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'lagotto-admin',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'production') {
    ENV.SITE_TITLE = 'DataCite Event Data';
    ENV.NAVMENU_TITLE = null;
    ENV.JWT_HOST = "https://profiles.datacite.org";
    ENV.ORCID_URL = "https://orcid.org";
  } else if (environment === 'stage') {
    ENV.SITE_TITLE = 'DataCite Event Data Test';
    ENV.NAVMENU_TITLE = 'Test Services';
    ENV.JWT_HOST = "https://profiles.test.datacite.org";
    ENV.ORCID_URL = "https://sandbox.orcid.org";
  } else if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    ENV.SITE_TITLE = 'DataCite Event Data';
    ENV.NAVMENU_TITLE = 'Development';
    ENV.JWT_HOST = "http://localhost:8080";
    ENV.ORCID_URL = "https://sandbox.orcid.org";

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  } else {
    ENV.SITE_TITLE = 'DataCite Event Data';
    ENV.NAVMENU_TITLE = 'Development';

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  return ENV;
};
