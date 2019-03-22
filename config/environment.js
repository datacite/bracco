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
    'polyfill-io': {
      features: [
        'default-3.6',
        'Intl.~locale.en-US'
      ]
    },
    emberTracker: {
			analyticsSettings: {
				trackingId: process.env.TRACKING_ID || null,
			},
		},
    flashMessageDefaults: {
      timeout: 5000,
      extendedTimeout: 0,
      priority: 200,
      sticky: true,
      showProgress: true,
      preventDuplicates: true
    },
    featureFlags: {
      'use-elasticsearch': false
    },

    SITE_TITLE: process.env.SITE_TITLE || "DataCite DOI Fabrica Test",
    NAVMENU_TITLE: process.env.NAVMENU_TITLE,
    SEARCH_URL: process.env.SEARCH_URL || "https://search.test.datacite.org",
    ORCID_URL: process.env.ORCID_URL || "https://sandbox.orcid.org",
    API_URL: process.env.API_URL || "https://api.test.datacite.org",
    RE3DATA_API_URL: process.env.RE3DATA_API_URL || "https://api.test.datacite.org",
    ROR_API_URL: process.env.ROR_API_URL || "https://api.ror.org",
    ORCID_API_URL: process.env.ORCID_API_URL || "https://pub.orcid.org",
    EVENTDATA_URL: process.env.EVENTDATA_URL || "https://api.test.datacite.org",
    CDN_URL: process.env.CDN_URL || "https://assets.test.datacite.org",
    JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY || null,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY || null,
    USER_UID: process.env.USER_UID || '0000-0001-5489-3594',
    USER_ROLE_ID: process.env.USER_ROLE_ID || "user",
    USER_NAME: process.env.USER_NAME || 'Josiah Carberry',

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
    ENV.featureFlags['use-elasticsearch'] = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    }
    ENV.API_JWT= process.env.API_JWT || '',


    ENV.APP.rootElement = '#ember-testing';

    ENV.featureFlags['use-elasticsearch'] = true;

    ENV.APP.autoboot = false;

    // for consistency of acceptance tests
    ENV.API_URL = "https://api.test.datacite.org"
    ENV.SITE_TITLE = "DataCite DOI Fabrica Test"
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  if (process.env.DEPLOY_TARGET === 'stage') {
    ENV.featureFlags['use-elasticsearch'] = true;
  }

  return ENV;
};
