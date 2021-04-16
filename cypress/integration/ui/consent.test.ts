/// <reference types="cypress" />
/* eslint-disable no-undef */

// NOTE: this is not a full end-to-end test.  A full test would see what the effects are of accepting
// or rejecting cookies.
describe('Consent', () => {
  const sizes = ['iphone-6', 'samsung-s10', 'ipad-2', [1024, 768]];

  sizes.forEach((size) => {
    it(`index on ${size} viewport`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }

      cy.clearCookies()
      cy.visit('/')
      cy.get('.CookieConsent').contains(
        'We use cookies on our website.'
      );
      cy.get('#rcc-decline-button').isInViewport()
      cy.get('#rcc-confirm-button').isInViewport().click()
      cy.getCookie('_consent').should('have.property', 'value', 'true');

      cy.clearCookies()
      cy.visit('/')
      cy.get('.CookieConsent').contains(
        'We use cookies on our website.'
      );
      cy.get('#rcc-confirm-button').isInViewport()
      cy.get('#rcc-decline-button').isInViewport().click()
      cy.getCookie('_consent').should('have.property', 'value', 'false');
    });
  });
});
