/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Anonymous: Anonymous', () => {
  beforeEach(() => {
    cy.setCookie('_consent', 'true');
  });

  describe('Homepage', () => {
    it('Header', () => {
      cy.visit('/');
      cy.get('div.motto h1').contains('DataCite Fabrica Stage');
    });

    it('Footer', () => {
      cy.visit('/');
      cy.get('div.footer-column h4').contains('About DataCite');
    });
  });

  describe('About', () => {
    it('Header', () => {
      cy.visit('/about');
      cy.get('h3.member').contains('About');
    });

    it('Version', () => {
      cy.visit('/about');
      cy.get('[data-cy="version"]').contains('3.9');
    });
  });
});
