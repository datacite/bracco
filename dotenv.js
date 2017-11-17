module.exports = function(env) {
  return {
    clientAllowedKeys: ['SITE_TITLE',
                        'NAVMENU_TITLE',
                        'SEARCH_URL',
                        'ORCID_URL',
                        'API_URL',
                        'USER_API_URL',
                        'DATA_URL',
                        'CDN_URL',
                        'JWT_HOST',
                        'JWT_PUBLIC_KEY',
                        'JWT_PRIVATE_KEY',
                        'ROLE_ID',
                        'BUGSNAG_API_KEY',
                        'AWS_ACCESS_KEY',
                        'AWS_SECRET_KEY',
                        'AWS_BUCKET',
                        'AWS_REGION']
  };
};
