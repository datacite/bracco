import '@cypress/code-coverage/support';
require('cypress-react-unit-test/support');

// Alternatively you can use CommonJS syntax:
// require('./commands')

// To turn off all uncaught exception handling

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

export {};
