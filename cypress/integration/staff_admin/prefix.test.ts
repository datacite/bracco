/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Admin: Prefix', () => {
  beforeEach(() => {
    cy.setCookie('_consent', 'true');
    cy.setCookie('_fabrica', Cypress.env('staff_admin_cookie'), { log: false });
  });

  it('search prefixes', () => {
    cy.visit('/prefixes');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/prefixes');
    });
    cy.get('input[name="query"]')
      .type('10.5438{enter}')
      .get('[data-test-prefix]')
      .should('contain', '10.5438');

    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('Prefixes');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    cy.get('a#add-prefixes').contains('Add Prefixes');
  });

  it('filter prefixes', () => {
    cy.visit('/prefixes');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/prefixes');
    });
    cy.get('a#prefix-with-repository')
      .click()
      .get('h3.member-results')
      .should('contain', 'Prefixes');

    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('Prefixes');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    cy.get('a#add-prefixes').contains('Add Prefixes');
  });

  it('visiting prefixes for member', () => {
    cy.visit('/providers/datacite/prefixes');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/datacite/prefixes');
    });
    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('Prefixes');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    cy.get('a#assign-prefix').contains('Assign Prefix');
  });

  it('visiting specific prefix for member', () => {
    cy.visit('/providers/datacite/prefixes/10.5438');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/datacite/prefixes/10.5438');
    });
    cy.get('[cy-data="prefix"]').contains('10.5438');
    // cy.get('[cy-data="datacite.datacite"]', { timeout: 30000 }).contains(
    //   'DataCite Repository'
    // );
  });
});
