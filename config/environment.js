/* eslint-env node */
'use strict';

module.exports = function (environment) {
  const pkg = require('../package.json');
  let deployTarget = process.env.DEPLOY_TARGET;
  // Bring in the environment variable - test/stage/development only.
  let testPrefixesAvailable = ((typeof process.env.PREFIXES_AVAILABLE === 'undefined') || (process.env.PREFIXES_AVAILABLE == "")) ? null : process.env.PREFIXES_AVAILABLE;

  let ENV = {
    modulePrefix: 'bracco',
    environment,
    rootURL: '/',
    locationType: process.env.EMBER_CLI_ELECTRON ? 'hash' : 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build ()
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: false
    },
    '@sentry/ember': {
      sentry: {
        dsn:
          process.env.SENTRY_DSN ||
          'https://63201db022924202b697e03bc5e0d0ba@o239790.ingest.sentry.io/1420435',

        disablePerformance: true,
        environment: deployTarget || "staging"
      }
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
      'show-researchers': false,
      // 'show-analytics': (process.env.SHOW_ANALYTICS && !(process.env.SHOW_ANALYTICS == "0" || process.env.SHOW_ANALYTICS == "false")) || false
      'enable-doi-estimate': (process.env.ENABLE_DOI_ESTIMATE === '1' ? true : false)
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
    ANALYTICS_URL: process.env.ANALYTICS_URL || 'https://analytics.stage.datacite.org',
    ANALYTICS_DASHBOARD_URL: process.env.ANALYTICS_DASHBOARD_URL || '',
    SHOW_ANALYTICS: ((process.env.SHOW_ANALYTICS && !(process.env.SHOW_ANALYTICS == "0" || process.env.SHOW_ANALYTICS == "false")) ? true : false),

    JWT_PUBLIC_KEY:
      process.env.JWT_PUBLIC_KEY ||
      '-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA22lpr1ntJQYKa+aCRjre\nPKTze/00S0SCdsWKhvk3honfjdebuxc54YdvfqKQk/1jLOPJj++vqIGwytKRI9uC\n1BmMRLrOluACiOgTc5DpzMm68lZss5D5g7tzjxB7NlFiKiYav1BtVDfvVxwuNqkY\njyNupf1Gjqp2/8wbsZ6SGIkzgovgjcHI5S8HZ7DE7rcrStISNJqTvpuMUXp++eie\nPkTgcrdZScKjO6VYu9epuhoyD2mbZdjAUbxYyjQ3vgftseLo4hXFEXpfIQzwxOLS\njmg1S/qxOzZHOMrp31pS1ricMtd4frvXztHPfh5XuyiOEozR0An9OIIwzKQsn+0q\np5QKfN+lHJflYGZ1TD8QruinWf8a5uWYd3q9c1V8RYgwgmfoxgHX5TmMbcQsBTuB\nyIy3io3rBiRnJEAgSu4PxNuQqVqqsaJ4cCmQrATLViZmXhZcbHJyWl3GJnZMpv8P\nor6m239QGZdoy5ijoOdVLQowtnsr+SWWrcYKF4J66223xjGBse7o3Q+gJUkyQKtB\nLifDld9XMTpgvEsZtZKEQ9S5gAWkiAzcjSMV0J4XMOzvHAalyNTucLc6ljG8HnjO\n34SrkvkkTlUwNsJOygRNJQujfQaStvb3MTagSqPteGhy9qSitSJPrDmN/W79stIe\nSvqHoJznDJsFfKUcypEG4l0CAwEAAQ==\n-----END PUBLIC KEY-----\n',
    STAFF_ADMIN_TOKEN: process.env.STAFF_ADMIN_TOKEN,
    CONSORTIUM_ADMIN_TOKEN: process.env.CONSORTIUM_ADMIN_TOKEN,
    ORGANIZATION_ADMIN_TOKEN: process.env.ORGANIZATION_ADMIN_TOKEN,
    CLIENT_ADMIN_TOKEN: process.env.CLIENT_ADMIN_TOKEN,
    USER_TOKEN: process.env.USER_TOKEN,
    VERSION: pkg.version,
    APP_NAME: pkg.name,
    JWT_BLACKLISTED: process.env.JWT_BLACKLISTED || '',

    googleTagManager: {
      appId: process.env.GOOGLE_TAG_MANAGER_ID
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (deployTarget === 'staging') {
    // add staging-specific settings here
    ENV.COOKIE_DOMAIN = '.stage.datacite.org';
    ENV.PREFIXES_AVAILABLE = testPrefixesAvailable;
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
    // ENV.featureFlags['show-analytics'] = false;
    ENV.SHOW_ANALYTICS = false;
    // Always null in production.
    ENV.PREFIXES_AVAILABLE = null;
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.COOKIE_DOMAIN = 'localhost';
    ENV.PREFIXES_AVAILABLE = process.env.PREFIXES_AVAILABLE;
    ENV.PREFIXES_AVAILABLE = testPrefixesAvailable;
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

    ENV.APP.autoboot = false;

    ENV.SITE_TITLE = 'DataCite Fabrica Stage';
    ENV.COOKIE_DOMAIN = 'localhost';
    ENV.API_URL = 'https://api.stage.datacite.org';
    ENV.PREFIXES_AVAILABLE = testPrefixesAvailable;
  }

  return ENV;
};
