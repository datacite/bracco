/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Anonymous: Anonymous', () => {
  beforeEach(() => {
    cy.setCookie('_consent', 'true');
  });

  describe('Homepage', () => {
    it('Header', () => {
      cy.visit('/');
      cy.get('div.motto h1', { timeout: 30000 }).contains(
        'DataCite Fabrica Stage'
      );
    });

    it('Footer', () => {
      cy.visit('/');
      cy.get('div.footer-column h4', { timeout: 30000 }).contains(
        'About DataCite'
      );
    });
  });

  describe('About', () => {
    it('Header', () => {
      cy.visit('/about');
      cy.get('h3.member', { timeout: 30000 }).contains('About');
    });

    it('Version', () => {
      cy.visit('/about');
      cy.get('[data-cy="version"]', { timeout: 30000 }).contains('3.9');
    });
  });
});
