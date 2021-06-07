/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('ACCEPTANCE: CONSORTIUM_ADMIN | CONSORTIUM ORGANIZATIONS', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;
  let prefix = '';
  let suffix = '';

  before(function () {
    cy.login(Cypress.env('consortium_admin_username'), Cypress.env('consortium_admin_password'));
    cy.setCookie('_consent', 'true');
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_fabrica', '_jwt', '_consent');
    cy.wait(waitTime2);
  });

  after(function () {
    // cy.log('TBD - CLEAN UP RESOURCES AFTER TEST');
  });

  // Check for page elements.
  it('is logged in to organizations page', () => {
    cy.visit('/providers/dc/organizations');
    cy.url().should('include', '/providers/dc/organizations').then(() => {

      // Has upper right user profile link.
      cy.get('h2.work').contains('DataCite Consortium');
      cy.get('a#account_menu_link').should('contain', 'DC');

      // Has tabs with correct one activated.
      cy.get('ul.nav-tabs li.active a').contains(/Consortium Organizations/i)
        .and('have.attr', 'href').and('include', '/providers/dc/organizations');

      // Has left sidebar buttons.
      cy.get('.btn-toolbar').within(($btnToolbar) => {
        cy.get('.btn-group a#add-organization').contains(/Add\s*Organization/i)
          .and('have.attr', 'href').and('include', '/providers/dc/organizations/new');
      });

      // Has left sidebar facets.
      cy.get('.facets h4').contains(/Year\s*joined/i);
      cy.get('.facets h4').contains(/Region/i);

      // Has search form.
      cy.get('form #search').within(($searchBar) => {
        cy.get('input[name="query"]')
          .and('have.attr', 'placeholder').should('match', /Type\s*to\s*search.../i);
        cy.get('button').contains(/Search/i);
      });

      // Organization total.
      cy.get('[data-test-results]').contains(/Consortium Organizations/i);

      // Sort.
      cy.get('#sort select').contains(/Sort by Name/i);
      cy.get('#sort select').contains(/Sort by Date Joined/i);
      cy.get('#sort select').contains(/Sort by Relevance/i);

      // Has search results as content.
      cy.get('#content').within(($content) => {
        cy.get('[data-test-organization]').its('length').should('be.gte', 1);
      });
    });
  });
});
