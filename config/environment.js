/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'bracco',
    environment,
    rootURL: '/',
    locationType: process.env.EMBER_CLI_ELECTRON ? 'hash' : 'auto',
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
      notifyReleaseStages: ['production']
    },
    emberTracker: {
			analyticsSettings: {
				trackingId: process.env.TRACKING_ID || null,
			},
		},

    SITE_TITLE: process.env.SITE_TITLE || "DataCite DOI Fabrica",
    NAVMENU_TITLE: process.env.NAVMENU_TITLE || 'Test Services',
    SEARCH_URL: process.env.SEARCH_URL || "https://search.test.datacite.org",
    ORCID_URL: process.env.ORCID_URL || "https://sandbox.orcid.org",
    API_URL: process.env.API_URL || "https://api.test.datacite.org",
    USER_API_URL: process.env.USER_API_URL || "https://profiles.test.datacite.org/api",
    CDN_URL: process.env.CDN_URL || "https://assets.test.datacite.org",
    DATA_URL: process.env.DATA_URL || "https://data.test.datacite.org",
    JWT_HOST: process.env.JWT_HOST || "https://profiles.test.datacite.org",
    JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY || null,

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
