/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('ACCEPTANCE: CONSORTIUM_ADMIN | PREFIXES', () => {
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
  it('is logged in to prefixes page', () => {
    cy.visit('/providers/dc/prefixes');
    cy.url().should('include', '/providers/dc/prefixes').then(() => {

      // Has upper right user profile link.
      cy.get('h2.work').contains('DataCite Consortium');
      cy.get('a#account_menu_link').should('contain', 'DC');

      // Has tabs with correct one activated.
      cy.get('ul.nav-tabs li.active a').contains(/Prefixes/i)
        .and('have.attr', 'href').and('include', '/providers/dc/prefixes');

      // Has left sidebar message box.
      cy.get('div.alert').contains(/New prefixes can't be assigned from this page./i);

      // Has left sidebar facets.
      cy.get('.facets h4').contains(/State/i);
      cy.get('.facets h4').contains(/Year\s*created/i);
      cy.get('.facets h4').contains(/Consortium\s*Organizations/);

      // Has search form.
      cy.get('form #search').within(($searchBar) => {
        cy.get('input[name="query"]')
          .and('have.attr', 'placeholder').should('match', /Type\s*to\s*search.../i);
        cy.get('button').contains(/Search/i);
      });

      // Prefix total.
      cy.get('[data-test-results]').contains(/Prefixes/i);

      // Sort.
      cy.get('#sort select').contains(/Sort by Prefix/i);
      cy.get('#sort select').contains(/Sort by Date Created/i);

      cy.get('[data-test-results]').contains(/Prefixes/i);

      // Has search results as content.
      cy.get('#content').within(($content) => {
        cy.get('[data-test-prefix]').its('length').should('be.gte', 1);
      });
    });
  });
});
