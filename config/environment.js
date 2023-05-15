/* eslint-env node */
'use strict';

module.exports = function (environment) {
  const pkg = require('../package.json');

  // Determines the deployment target for fabrica i.e. the different versions doi.datacite.org/doi.test.datacite.org/doi.stage.datacite.org/
  let fabricaDeployTarget = process.env.FABRICA_DEPLOY_TARGET;

  // Bring in the environment variables.
  let minPrefixesAvailable = ((typeof process.env.MIN_PREFIXES_AVAILABLE === 'undefined') || (process.env.MIN_PREFIXES_AVAILABLE == "")) ? 50 : process.env.MIN_PREFIXES_AVAILABLE;
  let showNPrefixes = ((typeof process.env.SHOW_N_PREFIXES === 'undefined') || (process.env.SHOW_N_PREFIXES == "")) ? 10 : process.env.SHOW_N_PREFIXES;
  let maxMintFutureOffset = parseInt(((typeof process.env.MAX_MINT_FUTURE_OFFSET === 'undefined') || (process.env.MAX_MINT_FUTURE_OFFSET == "")) ? 5 : process.env.MAX_MINT_FUTURE_OFFSET);

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
    '@sentry/ember': {
      sentry: {
        dsn:
          process.env.SENTRY_DSN ||
          'https://63201db022924202b697e03bc5e0d0ba@o239790.ingest.sentry.io/1420435',

        disablePerformance: true,
        environment: fabricaDeployTarget || "stage"
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
    CROSSREF_API_URL: process.env.CROSSREF_API_URL || 'https://api.crossref.org',
    ORCID_API_URL: process.env.ORCID_API_URL || 'https://pub.orcid.org',
    EVENTDATA_URL: process.env.EVENTDATA_URL || 'https://api.stage.datacite.org',
    CDN_URL: process.env.CDN_URL || 'https://assets.stage.datacite.org',
    HOME_URL: process.env.HOME_URL || 'https://www.stage.datacite.org',
    // informational links - mostly to the home page, collected here for easier maintenance.
    LINKS: {
      ASSIGN_DOIS: 'https://datacite.org/dois.html',
      BLOG: 'https://blog.datacite.org',
      COMMONS_URL: 'https://commons.datacite.org',
      CONTENT_NEGOTIATION: 'https://datacite.org/content.html',
      CREATE_A_FABRICA_ACCOUNT: 'https://support.datacite.org/docs/create-a-fabrica-account',
      EVENT_DATA: 'https://datacite.org/eventddata.html',
      FEE_MODEL: 'https://datacite.org/feemodel.html',
      GITHUB: 'https://github.com/datacite/datacite',
      GOVERNANCE: 'https://datacite.org/governance.html',
      IMPRINT: 'https://datacite.org/imprint.html',
      INTEGRATOR_URL: 'https://datacite.org/integratorapis.html',
      JOB_OPPORTUNITIES: 'https://datacite.org/jobopportunities.html',
      LINKEDIN: 'https://www.linkedin.com/company/datacite',
      MEMBERS: 'https://datacite.org/members.html',
      METADATA_SCHEMA: 'https://schema.datacite.org',
      METADATA_SEARCH: 'https://datacite.org/search.html',
      OAI_PMH: 'https://datacite.org/oaipmh.html',
      PARTNERS: 'https://datacite.org/partners.html',
      PARTNER_SERVICES_URL: 'https://datacite.org/partnerservices.html',
      PRIVACY_POLICY: 'https://datacite.org/privacy.html',
      PROFILES: 'https://datacite.org/profiles.html',
      RE3DATA: 'https://datacite.org/re3data.html',
      ROADMAP: 'https://datacite.org/roadmap.html',
      SERVICE_PROVIDERS: 'https://datacite.org/service-providers.html',
      SERVICE_STATUS: 'https://datacite.org/service.html',
      STAFF: 'https://datacite.org/staff.html',
      STATUS: 'https://status.datacite.org',
      STATISTICS: 'https://datacite.org/stats.html',
      STEERING: 'https://datacite.org/steering.html',
      SUPPORT: 'https://support.datacite.org',
      TERMS_AND_CONDITIONS: 'https://datacite.org/terms.html',
      TEST_ENVIRONMENT: 'https://datacite.org/test.html',
      TWITTER: 'https://twitter.com/datacite',
      WHAT_WE_DO: 'https://datacite.org/value.html',
      YOUTUBE: 'https://www.youtube.com/channel/UCVsSDZhIN_WbnD_v5o9eB_A',
      API_DOC: 'https://api.datacite.org',
      MDS_DOC: 'https://mds.datacite.org',
      OAI_DOC: 'https://oai.datacite.org',
      GRAPHQL_TOOL: 'https://api.datacite.org/graphql',
      FABRICA_DOC: 'https://support.datacite.org/docs/doi-fabrica',
    },
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
    },

    MIN_PREFIXES_AVAILABLE:  minPrefixesAvailable,
    SHOW_N_PREFIXES: showNPrefixes,
    MAX_MINT_FUTURE_OFFSET:  maxMintFutureOffset
  };

  if (fabricaDeployTarget === 'stage') {
    // add staging-specific settings here
    ENV.COOKIE_DOMAIN = '.stage.datacite.org';
  }

  if (fabricaDeployTarget === 'production') {
    ENV.SITE_TITLE = 'DataCite Fabrica';
    ENV.API_URL = 'https://api.datacite.org';
    ENV.ORCID_URL = 'https://orcid.org';
    ENV.FABRICA_URL = 'https://doi.datacite.org';
    ENV.CROSSREF_API_URL = 'https://api.crossref.org';
    ENV.EVENTDATA_URL = 'https://api.datacite.org';
    ENV.SEARCH_URL = 'https://search.datacite.org';
    ENV.CDN_URL = 'https://assets.datacite.org';
    ENV.HOME_URL = 'https://datacite.org';
    ENV.COOKIE_DOMAIN = '.datacite.org';
  }

  // Environment named 'test' here is the ember environment, not related to fabrica environments.
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
  }

  return ENV;
};
