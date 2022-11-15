/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('ACCEPTANCE: CLIENT_ADMIN | PREFIXES', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;
  let prefix = '10.80225';
  let suffix = '';

  before(function () {
    cy.login(Cypress.env('client_admin_username'), Cypress.env('client_admin_password'));
    cy.setCookie('_consent', 'true');
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_fabrica', '_jwt', '_consent');
    cy.wait(waitTime2);
  });

  after(function () {
    // TBD - CLEAN UP DOIS and other resources from test run.
    // cy.log('TBD - CLEAN UP RESOURCES AFTER TEST');
  });

  it('is logged in to prefixes page', () => {
    cy.visit('/repositories/datacite.test/prefixes');
    cy.url().should('include', '/repositories/datacite.test/prefixes').then(() => {

      // Has upper right user profile link.
      cy.get('h2.work').contains('DataCite Test Repository');
      cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');

      // Has tabs with correct one activated.
      cy.get('ul.nav-tabs li a').contains(/Info/i)
        .and('have.attr', 'href').and('include', '/repositories/datacite.test/info');
      cy.get('ul.nav-tabs li a').contains(/Settings/i)
        .and('have.attr', 'href').and('include', '/repositories/datacite.test');
      cy.get('ul.nav-tabs li.active a').contains(/Prefixes/i)
        .and('have.attr', 'href').and('include', '/repositories/datacite.test/prefixes');
      cy.get('ul.nav-tabs li a').contains(/DOIs/i)
        .and('have.attr', 'href').and('include', '/repositories/datacite.test/dois');

      // Has left sidebar message box.
      // cy.get('div.alert').contains(/Please ask DataCite Staff if you want to add a prefix./i);

      // Has left sidebar facets.
      cy.get('.facets h4').contains(/Year\s*created/i);

      // Has search form.
      cy.get('form #search').within(($searchBar) => {
        cy.get('input[name="query"]')
          .and('have.attr', 'placeholder').should('match', /Type\s*to\s*search.../i);
        cy.get('button').contains(/Search/i);
      });

      // Has search results as content.
      cy.get('#content').within(($content) => {
        cy.get('[data-test-results]').contains(/Prefixes/i);

        // Has at least one results with our prefix.
        cy.get('[data-test-prefix]').contains(prefix);
      });
    });
  });
});
