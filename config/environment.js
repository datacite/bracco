/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'bracco',
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
    'ember-cli-string-helpers': {
      only: ['humanize', 'html-safe', 'truncate', 'titleize']
    },
    bugsnag: {
      apiKey: process.env.BUGSNAG_API_KEY,
      notifyReleaseStages: ['development', 'stage', 'production']
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.SITE_TITLE = process.env.SITE_TITLE || "DataCite Event Data";
  ENV.NAVMENU_TITLE = process.env.NAVMENU_TITLE;
  ENV.SEARCH_URL = process.env.SEARCH_URL || "https://search.datacite.org";
  ENV.ORCID_URL = process.env.ORCID_URL || "https://orcid.org";
  ENV.API_URL = process.env.API_URL || "https://api.datacite.org";
  ENV.USER_API_URL = process.env.USER_API_URL || "https://profiles.datacite.org/api";
  ENV.CDN_URL = process.env.CDN_URL || "https://assets.datacite.org";
  ENV.JWT_HOST = process.env.JWT_HOST || "https://profiles.datacite.org";
  ENV.JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY;

  ENV.i18n = {
    defaultLocale: 'en'
  };

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  return ENV;
};
