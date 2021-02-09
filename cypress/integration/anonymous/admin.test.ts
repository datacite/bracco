/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Anonymous: Admin', () => {
  beforeEach(() => {
    cy.setCookie('_consent', 'true');
  });

  it('is not logged in', () => {
    cy.visit('/');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#account_menu_link').should('not.exist');
  });

  // the following pages require authentication. Redirects to homepage otherwise
  it('visiting info', () => {
    cy.visit('/info');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('div.motto h1').contains('DataCite Fabrica Stage');
  });

  it('visiting providers', () => {
    cy.visit('/providers');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('div.motto h1').contains('DataCite Fabrica Stage');
  });

  it('visiting repositories', () => {
    cy.visit('/repositories');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('div.motto h1').contains('DataCite Fabrica Stage');
  });

  it('visiting contacts', () => {
    cy.visit('/contacts');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('div.motto h1').contains('DataCite Fabrica Stage');
  });

  it('visiting prefixes', () => {
    cy.visit('/prefixes');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('div.motto h1').contains('DataCite Fabrica Stage');
  });

  it('visiting prefix 10.80225', () => {
    cy.visit('/prefixes/10.80225');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/prefixes/10.80225');
    });
    cy.get('div.alert-warning').contains('The page was not found.');
  });

  it('visiting dois', () => {
    cy.visit('/dois');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('div.motto h1').contains('DataCite Fabrica Stage');
  });
});
