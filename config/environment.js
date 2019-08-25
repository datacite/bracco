/* eslint-env node */
'use strict';

module.exports = function(environment) {
  const pkg = require('../package.json');

  let ENV = {
    modulePrefix: 'bracco',
    environment,
    rootURL: '/',
    locationType: process.env.EMBER_CLI_ELECTRON ? 'hash' : 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: false
    },
    sentry: {
      environment,
    },
    'ember-cli-string-helpers': {
      only: ['humanize', 'html-safe', 'truncate', 'titleize']
    },
    'polyfill-io': {
      features: [
        'default-3.6'
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
      'use-repositories': false
    },
    fastboot: {
      hostWhitelist: ['doi.datacite.org', 'doi.test.datacite.org', /^10\.0\.\d{1,3}\.\d{1,3}$/, /^localhost:\d+$/]
    },

    JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY || null,
    SENTRY_DSN: process.env.SENTRY_DSN || null,
    VERSION: pkg.version,
    APP_NAME: pkg.name,

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

    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    }
    ENV.API_JWT= process.env.API_JWT || '',

    ENV.APP.rootElement = '#ember-testing';

    ENV.featureFlags['use-repositories'] = true;

    ENV.APP.autoboot = false;

    // for consistency of acceptance tests
    ENV.API_URL = "https://api.test.datacite.org"
    ENV.SITE_TITLE = "DataCite DOI Fabrica Test"
  }

  if (process.env.DEPLOY_TARGET === 'production') {
    ENV.SITE_TITLE = process.env.SITE_TITLE || "DataCite DOI Fabrica";
    ENV.NAVMENU_TITLE = process.env.NAVMENU_TITLE;
    ENV.SEARCH_URL = process.env.SEARCH_URL || "https://search.datacite.org";
    ENV.ORCID_URL = process.env.ORCID_URL || "https://orcid.org";
    ENV.API_URL = process.env.API_URL || "https://api.datacite.org";
    ENV.FABRICA_URL = process.env.FABRICA_URL || "https://doi.datacite.org";
    ENV.ROR_API_URL = process.env.ROR_API_URL || "https://api.ror.org";
    ENV.ORCID_API_URL = process.env.ORCID_API_URL || "https://pub.orcid.org";
    ENV.EVENTDATA_URL = process.env.EVENTDATA_URL || "https://api.datacite.org";
    ENV.CDN_URL = process.env.CDN_URL || "https://assets.datacite.org";

    // here you can enable a production-specific feature
    ENV.featureFlags['use-repositories'] = false;
  } else {
    ENV.SITE_TITLE = process.env.SITE_TITLE || "DataCite DOI Fabrica Test";
    ENV.NAVMENU_TITLE = process.env.NAVMENU_TITLE;
    ENV.SEARCH_URL = process.env.SEARCH_URL || "https://search.test.datacite.org";
    ENV.ORCID_URL = process.env.ORCID_URL || "https://sandbox.orcid.org";
    ENV.API_URL = process.env.API_URL || "https://api.test.datacite.org";
    ENV.FABRICA_URL = process.env.FABRICA_URL || "https://doi.test.datacite.org";
    ENV.ROR_API_URL = process.env.ROR_API_URL || "https://api.ror.org";
    ENV.ORCID_API_URL = process.env.ORCID_API_URL || "https://pub.orcid.org";
    ENV.EVENTDATA_URL = process.env.EVENTDATA_URL || "https://api.test.datacite.org";
    ENV.CDN_URL = process.env.CDN_URL || "https://assets.test.datacite.org";

    // here you can enable a stage-specific feature
    ENV.featureFlags['use-repositories'] = true;
  }

  return ENV;
};
