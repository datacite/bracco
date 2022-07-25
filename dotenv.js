module.exports = function () {
  return {
    clientAllowedKeys: [
      'SITE_TITLE',
      'NAVMENU_TITLE',
      'SEARCH_URL',
      'ORCID_URL',
      'FABRICA_URL',
      'API_URL',
      'EVENTDATA_URL',
      'CDN_URL',
      'JWT_PUBLIC_KEY',
      'USER_NAME',
      'SENTRY_DSN',
      'AWS_ACCESS_KEY',
      'AWS_SECRET_KEY',
      'AWS_BUCKET',
      'AWS_REGION',
      'FABRICA_DEPLOY_TARGET',
      'STAFF_ADMIN_PASSWORD',
      'CONSORTIUM_ADMIN_PASSWORD',
      'ORGANIZATION_ADMIN_PASSWORD',
      'CLIENT_ADMIN_PASSWORD',
      'STAFF_ADMIN_USERNAME',
      'CONSORTIUM_ADMIN_USERNAME',
      'ORGANIZATION_ADMIN_USERNAME',
      'CLIENT_ADMIN_USERNAME',
      'ENABLE_DOI_ESTIMATE',
      'PREFIXES_AVAILABLE',
      'MAX_MINT_FUTURE_OFFSET'
    ],
    fastbootAllowedKeys: [
      'SITE_TITLE',
      'NAVMENU_TITLE',
      'SEARCH_URL',
      'ORCID_URL',
      'FABRICA_URL',
      'API_URL',
      'EVENTDATA_URL',
      'CDN_URL',
      'JWT_PUBLIC_KEY',
      'USER_NAME',
      'SENTRY_DSN',
      'AWS_ACCESS_KEY',
      'AWS_SECRET_KEY',
      'AWS_BUCKET',
      'AWS_REGION',
      'FABRICA_DEPLOY_TARGET',
      'STAFF_ADMIN_PASSWORD',
      'CONSORTIUM_ADMIN_PASSWORD',
      'ORGANIZATION_ADMIN_PASSWORD',
      'CLIENT_ADMIN_PASSWORD',
      'STAFF_ADMIN_USERNAME',
      'CONSORTIUM_ADMIN_USERNAME',
      'ORGANIZATION_ADMIN_USERNAME',
      'CLIENT_ADMIN_USERNAME',
      'ENABLE_DOI_ESTIMATE',
<<<<<<< HEAD
      'PREFIXES_AVAILABLE'
=======
      'MAX_MINT_FUTURE_OFFSET'
>>>>>>> make max_mint_future_offset settable in one place and enable it to be imported from an environment variable
    ],
    failOnMissingKey: false
  };
};
