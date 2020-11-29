/* eslint-env node */
'use strict';

module.exports = function (environment) {
  const pkg = require('../package.json');
  let deployTarget = process.env.DEPLOY_TARGET;

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
      environment
    },
    'ember-cli-string-helpers': {
      only: ['humanize', 'html-safe', 'truncate', 'titleize']
    },
    'polyfill-io': {
      features: ['default-3.6']
    },
    'ember-loading': {
      preDelay: 500
    },
    emberTracker: {
      analyticsSettings: {
        trackingId: process.env.TRACKING_ID || 'UA-22806196-13'
      }
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
      'show-researchers': false
    },
    fastboot: {
      hostWhitelist: [
        'doi.datacite.org',
        'doi.stage.datacite.org',
        'doi.test.datacite.org',
        /^10\.0\.\d{1,3}\.\d{1,3}$/,
        /^localhost:\d+$/
      ]
    },

    SITE_TITLE: process.env.SITE_TITLE || 'DataCite Fabrica Stage',
    NAVMENU_TITLE: process.env.NAVMENU_TITLE,
    SEARCH_URL: process.env.SEARCH_URL || 'https://search.stage.datacite.org',
    ORCID_URL: process.env.ORCID_URL || 'https://orcid.org',
    API_URL: process.env.API_URL || 'https://api.stage.datacite.org',
    FABRICA_URL: process.env.FABRICA_URL || 'https://doi.stage.datacite.org',
    ROR_API_URL: process.env.ROR_API_URL || 'https://api.ror.org',
    CROSSREF_API_URL:
      process.env.CROSSREF_API_URL || 'https://api.crossref.org',
    ORCID_API_URL: process.env.ORCID_API_URL || 'https://pub.orcid.org',
    EVENTDATA_URL:
      process.env.EVENTDATA_URL || 'https://api.stage.datacite.org',
    CDN_URL: process.env.CDN_URL || 'https://www.stage.datacite.org',
    JWT_PUBLIC_KEY:
      process.env.JWT_PUBLIC_KEY ||
      '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxWfFGoaO4d9s7OoW34UD\nbEbFdh1FrAXT5QmWVocZIP0Y+1KtNGNjpRpazlSWeSMFuswoDG/cKiJX3BQkP7fw\nbHCujQoNpQqznsI8rRJYZh/L+THxjY7OEoFg7QohqnEHRr9YW4wPzh+I0xj2puVr\ngyQzREYckeBUEJnS2uXdiZ32LzbiH4pE+wwZNVQv0BbadnTc2mJWMaEcUfuh0Qko\nxIVpPwTCzyD4kMriETe+/AOw/2DEwbNJakh8N2ySMhXbso/zHxStEw2YesJkNJWG\n+aG5ApSbwTba8DVHKvTgCsE1d+1tHFyeruTxPIfamwA/VkVBuUpYR7CmJaoNuk1e\nKwIDAQAB\n-----END PUBLIC KEY-----\n',
    SENTRY_DSN:
      process.env.SENTRY_DSN ||
      'https://63201db022924202b697e03bc5e0d0ba@sentry.io/1420435',
    STAFF_ADMIN_TOKEN: process.env.STAFF_ADMIN_TOKEN,
    CONSORTIUM_ADMIN_TOKEN: process.env.CONSORTIUM_ADMIN_TOKEN,
    ORGANIZATION_ADMIN_TOKEN: process.env.ORGANIZATION_ADMIN_TOKEN,
    CLIENT_ADMIN_TOKEN: process.env.CLIENT_ADMIN_TOKEN,
    USER_TOKEN: process.env.USER_TOKEN,
    VERSION: pkg.version,
    APP_NAME: pkg.name,
    JWT_BLACKLISTED: process.env.JWT_BLACKLISTED || '',

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (deployTarget === 'staging') {
    // add staging-specific settings here
    ENV.COOKIE_DOMAIN = '.stage.datacite.org';
  }

  if (deployTarget === 'production') {
    ENV.SITE_TITLE = 'DataCite Fabrica';
    ENV.API_URL = 'https://api.datacite.org';
    ENV.ORCID_URL = 'https://orcid.org';
    ENV.FABRICA_URL = 'https://doi.datacite.org';
    ENV.CROSSREF_API_URL = 'https://api.crossref.org';
    ENV.EVENTDATA_URL = 'https://api.datacite.org';
    ENV.SEARCH_URL = 'https://search.datacite.org';
    ENV.CDN_URL = 'https://datacite.org';
    ENV.COOKIE_DOMAIN = '.datacite.org';
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.COOKIE_DOMAIN = 'localhost';
    ENV.SENTRY_DSN = null;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    };
    (ENV.API_JWT = process.env.API_JWT || ''),
      (ENV.APP.rootElement = '#ember-testing');

    ENV.featureFlags['show-researchers'] = true;

    ENV.APP.autoboot = false;

    ENV.SITE_TITLE = 'DataCite Fabrica Stage';
    ENV.COOKIE_DOMAIN = 'localhost';
    ENV.API_URL = 'https://api.stage.datacite.org';
    ENV.SENTRY_DSN = null;
  }

  return ENV;
};
