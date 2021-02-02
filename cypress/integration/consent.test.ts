/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Consent', () => {
  const sizes = ['ipad-2', [1024, 768]];

  sizes.forEach((size) => {
    it(`index on ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }

      cy.getCookie('_consent').should('not.exist');

      cy.visit('/');
      cy.get('.CookieConsent', { timeout: 30000 }).contains(
        'We use cookies on our website. Some are technically necessary, others help us improve your user experience.'
      );
      cy.get('#rcc-confirm-button').click();
      cy.getCookie('_consent').should('have.property', 'value', 'true');
      cy.get('h1', { timeout: 30000 }).contains('DataCite Fabrica Stage');
    });
  });
});
