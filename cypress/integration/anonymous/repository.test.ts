/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Anonymous: Repository', () => {
  beforeEach(() => {
    cy.setCookie('_consent', 'true');
  });
  const site_title = new RegExp('Datacite.*Fabrica', 'i')


  // the following pages require authentication. Redirects to homepage otherwise
  it('visiting repository AWI', () => {
    cy.visit('/repositories/tib.awi');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('div.motto h1').contains(site_title);
  });

  it('visiting repository AWI settings', () => {
    cy.visit('/repositories/tib.awi/settings');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('div.motto h1').contains(site_title);
  });

  it('visiting repository AWI prefixes', () => {
    cy.visit('/repositories/tib.awi/prefixes');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('div.motto h1').contains(site_title);
  });

  it('visiting repository AWI dois', () => {
    cy.visit('/repositories/tib.awi/dois');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('div.motto h1').contains(site_title);
  });
});
