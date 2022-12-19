// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

/// <reference types="cypress" />

require('dotenv').config();

const browserify = require('@cypress/browserify-preprocessor');

module.exports = (on, config) => {
  let options = browserify.defaultOptions;
  options.browserifyOptions.transform[1][1].babelrc = true;
  options.typescript = require.resolve('typescript');
  on('file:preprocessor', browserify(options));

  require('@cypress/code-coverage/task')(on, config);

  // env variables
  config.env.staff_admin_username = process.env.STAFF_ADMIN_USERNAME;
  config.env.staff_admin_password = process.env.STAFF_ADMIN_PASSWORD;
  config.env.consortium_admin_username = process.env.CONSORTIUM_ADMIN_USERNAME;
  config.env.consortium_admin_password = process.env.CONSORTIUM_ADMIN_PASSWORD;
  config.env.organization_admin_username = process.env.ORGANIZATION_ADMIN_USERNAME;
  config.env.organization_admin_password = process.env.ORGANIZATION_ADMIN_PASSWORD;
  config.env.client_admin_username = process.env.CLIENT_ADMIN_USERNAME;
  config.env.client_admin_password = process.env.CLIENT_ADMIN_PASSWORD;
  config.env.api_url = process.env.API_URL || 'https://api.stage.datacite.org';

  config.env.staff_admin_cookie = process.env.CYPRESS_STAFF_ADMIN_COOKIE;
  config.env.consortium_admin_cookie =
    process.env.CYPRESS_CONSORTIUM_ADMIN_COOKIE;
  config.env.organization_admin_cookie =
    process.env.CYPRESS_ORGANIZATION_ADMIN_COOKIE;
  config.env.client_admin_cookie =
    process.env.CYPRESS_CLIENT_ADMIN_COOKIE;

  config.env.site_title = process.env.SITE_TITLE || "DataCite Fabrica Test"
  config.baseUrl = process.env.FABRICA_URL || config.baseUrl || ""

  config.env.client_admin_password = process.env.CLIENT_ADMIN_PASSWORD

  config.env.max_mint_future_offset = process.env.MAX_MINT_FUTURE_OFFSET || 5

  on('task', {
    // deconstruct the individual properties
    hello({ greeting, name }) {
      console.log('%s, %s', greeting, name)

      return null
    },

    // seed db - create a doi (to be updated or deleted)
    create_doi({ prefix }) {
      console.log('HERE IS THE PREFIX:  %s', prefix);
      return null
    },

    // seed db - create a doi using a file (to be updated or deleted)
    create_doi({ prefix }) {
      console.log('HERE IS THE PREFIX:  %s', prefix);
      return null
    },
  })

  return config
}
