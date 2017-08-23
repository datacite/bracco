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
    emberTracker: {
			analyticsSettings: {
				trackingId: process.env.TRACKING_ID || null,
			},
		},

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.SITE_TITLE = process.env.SITE_TITLE || "DataCite DOI Registration Service";
  ENV.NAVMENU_TITLE = process.env.NAVMENU_TITLE || 'Test Services';
  ENV.SEARCH_URL = process.env.SEARCH_URL || "https://search.test.datacite.org";
  ENV.ORCID_URL = process.env.ORCID_URL || "https://sandbox.orcid.org";
  ENV.API_URL = process.env.API_URL || "https://api.test.datacite.org";
  ENV.USER_API_URL = process.env.USER_API_URL || "https://profiles.test.datacite.org/api";
  ENV.CDN_URL = process.env.CDN_URL || "https://assets.test.datacite.org";
  ENV.DATA_URL = process.env.DATA_URL || "https://data.test.datacite.org";
  ENV.JWT_HOST = process.env.JWT_HOST || "https://profiles.test.datacite.org";
  ENV.JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY || null;
  ENV.BUGSNAG_API_KEY = process.env.BUGSNAG_API_KEY || null;
  ENV.BUGSNAG_NOTIFY_RELEASE = process.env.BUGSNAG_NOTIFY_RELEASE || "production";

  ENV.i18n = {
    defaultLocale: 'en-US'
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
