/// <reference types="cypress" />
/* eslint-disable no-undef */

// NOTE: this is not a full end-to-end test.  A full test would see what the effects are of accepting
// or rejecting cookies.
describe('ACCEPTANCE: UI | CONSENT', () => {
  const sizes = ['iphone-6', 'samsung-s10', 'ipad-2', [1024, 768]];

  const waitTime = 1000;
  const waitTime2 = 2000;

  before(function () {
    //Cypress.session.clearAllSavedSessions()
    Cypress.session.clearCurrentSessionData()
    cy.clearCookies()
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
    
    cy.wait(waitTime2);
  })


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

      cy.isInViewport('#rcc-decline-button')
      cy.isInViewport('#rcc-confirm-button').click()
      cy.getCookie('_consent').should('have.property', 'value', 'true');

      cy.clearCookies()
      cy.visit('/')
      cy.get('.CookieConsent').contains(
        'We use cookies on our website.'
      );

      cy.isInViewport('#rcc-confirm-button')
      cy.isInViewport('#rcc-decline-button').click()
      cy.getCookie('_consent').should('have.property', 'value', 'false');
    });
  });
});
