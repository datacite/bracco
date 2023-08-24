/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('ACCEPTANCE: ANONYMOUS - AVAILABLE PAGES', () => {
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
  const site_title = new RegExp('Datacite.*Fabrica', 'i');

  describe('Homepage', () => {
    it('Header', () => {
      cy.visit('/');
      cy.get('div.motto h1').contains(site_title);
      cy.get('a#sign-in').should('exist');

    // Create DOI button
    cy.get('.create-doi-button').should('not.exist');      
    });
  });

  describe('About', () => {
    it('Header', () => {
      cy.visit('/about');
      cy.get('h3.member').contains('About');
      cy.get('a#sign-in').should('exist');
      cy.get('img.fabrica-logo').should('exist').should('have.attr', 'src').should('include', 'fabrica-logo.svg');
    });

    // it('Version', () => {
    //   cy.visit('/about');
    //   cy.get('[data-cy="version"]').contains('3.9');
    // });
  });
});
