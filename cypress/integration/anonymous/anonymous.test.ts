/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('ACCEPTANCE: ANONYMOUS - AVAILABLE PAGES', () => {
  beforeEach(() => {
    cy.setCookie('_consent', 'true');
  });
  const site_title = new RegExp('Datacite.*Fabrica', 'i')

  describe('Homepage', () => {
    it('Header', () => {
      cy.visit('/');
      cy.get('div.motto h1').contains(site_title);
      cy.get('a#sign-in').should('exist');
    });
  });

  describe('About', () => {
    it('Header', () => {
      cy.visit('/about');
      cy.get('h3.member').contains('About');
      cy.get('a#sign-in').should('exist');
    });

    // it('Version', () => {
    //   cy.visit('/about');
    //   cy.get('[data-cy="version"]').contains('3.9');
    // });
  });
});
