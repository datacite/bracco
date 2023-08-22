/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('ACCEPTANCE: ANONYMOUS - DOI', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;

  before(function () {
    Cypress.session.clearCurrentSessionData()
    cy.clearCookies()
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
    cy.wait(waitTime2);
  })

  beforeEach(() => {
    cy.setCookie('_consent', 'true');
  });

  // the following pages require authentication. Redirects to homepage otherwise
  it('visiting specific doi', () => {
    cy.visit('/dois/10.80225%2Fda52-7919');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/dois/10.80225%2Fda52-7919');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('h2.work').contains('10.80225/da52-7919');
    cy.get('img.fabrica-logo').should('exist').should('have.attr', 'src').should('include', 'fabrica-logo.svg');

    // Create DOI button
    cy.get('.create-doi-button').should('not.exist');      
  });
});
