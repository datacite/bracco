/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Anonymous: Provider', () => {
  beforeEach(() => {
    cy.setCookie('_consent', 'true');
  });

  // the following pages require authentication. Redirects to homepage otherwise
  it('visiting provider TIB', () => {
    cy.visit('/providers/tib');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('div.motto h1').contains('DataCite Fabrica Stage');
  });

  it('visiting provider TIB info', () => {
    cy.visit('/providers/tib/info');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('div.motto h1').contains('DataCite Fabrica Stage');
  });

  it('visiting provider TIB repositories', () => {
    cy.visit('/providers/tib/repositories');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('div.motto h1').contains('DataCite Fabrica Stage');
  });

  it('visiting provider TIB prefixes', () => {
    cy.visit('/providers/tib/prefixes');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('div.motto h1').contains('DataCite Fabrica Stage');
  });

  it('visiting provider TIB dois', () => {
    cy.visit('/providers/tib/dois');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('div.motto h1').contains('DataCite Fabrica Stage');
  });
});
