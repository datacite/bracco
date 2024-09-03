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
    cy.wait(waitTime2);
  });

  beforeEach(() => {
    // TBD - set up test environment
  });

  after(function () {
    // TBD - Clean up any resources created for the test. (only local dev and stage).
    // cy.log('TBD - CLEAN UP RESOURCES AFTER TEST');
    cy.clearAllSessionStorage()
  });

  // Check for page elements.
  it('is logged in to prefixes page', () => {
    cy.visit('/providers/dc/prefixes');
    cy.url().should('include', '/providers/dc/prefixes').then(() => {
      cy.wait(5000)

      // Has Fabrica logo and correct navbar color
      cy.get('img.fabrica-logo').should('exist').should('have.attr', 'src').should('include', 'fabrica-logo.svg');
      cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(36, 59, 84)');

      // Has upper right user profile link.
      cy.get('h2.work').contains('DataCite Consortium');
      cy.get('a#account_menu_link').should('contain', 'DC');

      // Has tabs with correct one activated.
      cy.get('ul.nav-tabs li.active a', { timeout: 40000 }).contains(/Prefixes/i)
        .and('have.attr', 'href').and('include', '/providers/dc/prefixes');

      // Has left sidebar message box.
      // cy.get('div.alert').contains(/New prefixes can't be assigned from this page./i);

      cy.get('button.export-basic-metadata').should('not.exist');

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

      // Create DOI button
      cy.get('.create-doi-button').should('not.exist');    
    });
  });

  it('can see prefixes when using capitalized identifier URL subdirectory', () => {
    cy.visit('/providers/DC/prefixes');
    cy.url().should('include', '/providers/DC/prefixes').then(() => {

      // Prefix page should be populated.
      cy.contains('No prefixes found.').should('not.exist')
    });
  });
});
