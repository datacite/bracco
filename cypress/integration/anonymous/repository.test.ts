/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Anonymous: Repository', () => {
  beforeEach(() => {
    cy.setCookie('_consent', 'true');
  });

  // redirects to homepage
  it('visiting repository AWI', () => {
    cy.visit('/repositories/tib.awi');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('div.motto h1', { timeout: 30000 }).contains(
      'DataCite Fabrica Stage'
    );
  });

  it('visiting repository AWI info', () => {
    cy.visit('/repositories/tib.awi/info');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('div.motto h1', { timeout: 30000 }).contains(
      'DataCite Fabrica Stage'
    );
  });

  it('visiting repository AWI prefixes', () => {
    cy.visit('/repositories/tib.awi/prefixes');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('div.motto h1', { timeout: 30000 }).contains(
      'DataCite Fabrica Stage'
    );
  });

  it('visiting repository AWI dois', () => {
    cy.visit('/repositories/tib.awi/dois');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('div.motto h1', { timeout: 30000 }).contains(
      'DataCite Fabrica Stage'
    );
  });
});
