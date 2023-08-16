// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
//import './commands'

// Alternatively you can use CommonJS syntax:
require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
  // we expect a 3rd party library error with the given message
  // and don't want to fail the test so we return false
  if (
    err.message.includes("Failed to update the 'id' for the RecordIdentifier") ||
    err.message.includes("Attempted to register a view with an id already in use") ||
    err.message.includes('Ember Data Request GET.*returned a 503') ||
    err.message.includes('some of the associated records were not loaded')
  ) {
    return false
  }
  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test
})
