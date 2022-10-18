/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('ACCEPTANCE: ANONYMOUS - PROVIDER', () => {
  beforeEach(() => {
    cy.setCookie('_consent', 'true');
  });
  const site_title = new RegExp('Datacite.*Fabrica', 'i')

  // the following pages require authentication. Redirects to homepage otherwise
  it('visiting provider TIB', () => {
    cy.visit('/providers/tib');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('div.motto h1').contains(site_title);
    cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(0, 177, 226)');
  });

  it('visiting provider TIB info', () => {
    cy.visit('/providers/tib/info');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('div.motto h1').contains(site_title);
    cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(0, 177, 226)');
  });

  it('visiting provider TIB repositories', () => {
    cy.visit('/providers/tib/repositories');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('div.motto h1').contains(site_title);
    cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(0, 177, 226)');
  });

  it('visiting provider TIB prefixes', () => {
    cy.visit('/providers/tib/prefixes');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('div.motto h1').contains(site_title);
    cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(0, 177, 226)');
  });

  it('visiting provider TIB dois', () => {
    cy.visit('/providers/tib/dois');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('div.motto h1').contains(site_title);
    cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(0, 177, 226)');
  });
});
