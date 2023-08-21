/// <reference types="cypress" />
/* eslint-disable no-undef */

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

describe('ACCEPTANCE: CONSORTIUM_ADMIN | REPOSITORIES', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;
  let prefix = '';
  let suffix = '';
  const min = 500000;
  const max = 999999;
  const consortium_id = Cypress.env('consortium_admin_username').toLowerCase()
  const test_contact_family_name_prefix = "ConsortiumAdmin"

  before(function () {
    const rndInt = randomIntFromInterval(min, max);
    given_name = 'Jack';
    family_name = test_contact_family_name_prefix + rndInt;
    email = given_name + '.' + family_name + '@example.org';
    type = 'providers';
    roles = ["voting", "service", "secondary_service", "technical", "secondary_technical", "billing"];

    cy.login(Cypress.env('consortium_admin_username'), Cypress.env('consortium_admin_password'));
    cy.setCookie('_consent', 'true');

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, consortium_id, Cypress.env('api_url'), cookie.value)
    })
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_fabrica', '_jwt', '_consent');
    cy.wait(waitTime2);
  });

  after(() => {
    cy.getCookie('_jwt').then((cookie) => {
      cy.deleteProviderTestContacts(consortium_id, test_contact_family_name_prefix, Cypress.env('api_url'), cookie.value)
    })
  })

  // Check for page elements.
  it('is logged in to repositories page', () => {
    cy.visit('/providers/' + consortium_id + '/repositories');
    cy.url().should('include', '/providers/' + consortium_id + '/repositories').then(() => {

      // Has Fabrica logo and correct navbar color
      cy.get('img.fabrica-logo').should('exist').should('have.attr', 'src').should('include', 'fabrica-logo.svg');
      cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(36, 59, 84)');

      // Has upper right user profile link.
      cy.get('h2.work').contains('DataCite Consortium');
      cy.get('a#account_menu_link').should('contain', Cypress.env('consortium_admin_username').toUpperCase());

      // Has tabs with correct one activated.
      cy.get('ul.nav-tabs li.active a').contains(/Repositories/i)
        .and('have.attr', 'href').and('include', '/providers/' + consortium_id + '/repositories');

      // Has left sidebar message box.
      cy.get('div.alert').contains(/New repositories can't be created from this page./i);

      cy.get('button.export-basic-metadata').should('not.exist');

      // Has left sidebar facets.
      cy.get('.facets h4').contains(/Year\s*joined/i);
      cy.get('.facets h4').contains(/Type/i);
      cy.get('.facets h4').contains(/Repository\s*Type/);
      cy.get('.facets h4').contains(/Certificate/i);
      cy.get('.facets h4').contains(/Software/i);

      // Has search form.
      cy.get('form #search').within(($searchBar) => {
        cy.get('input[name="query"]')
          .and('have.attr', 'placeholder').should('match', /Type\s*to\s*search.../i);
        cy.get('button').contains(/Search/i);
      });

      // Repository total.
      cy.get('[data-test-results]').contains(/Repositories/i);

      // Sort.
      cy.get('#sort select').contains(/Sort by Name/i);
      cy.get('#sort select').contains(/Sort by Date Joined/i);
      cy.get('#sort select').contains(/Sort by Relevance/i);

      // Has search results as content.
      cy.get('#content').within(($content) => {
        cy.get('[data-test-repository]').its('length').should('be.gte', 1);
      });

      // Create DOI button
      cy.get('.create-doi-button').should('not.exist');    
    });
  });

  // ASSUMING DATACITE.TEST EXISTS:
  it('check repositories tabs for required components - assumes datacite.test exists', () => {
    cy.visit('/repositories/datacite.test');
    cy.wait(waitTime2);

    // Create DOI button
    cy.get('.create-doi-button').should('not.exist');    

    cy.visit('/repositories/datacite.test/info');
    cy.wait(waitTime2);

    // Create DOI button
    cy.get('.create-doi-button').should('not.exist');    

    cy.visit('/repositories/datacite.test/prefixes');
    cy.wait(waitTime2);

    // Create DOI button
    cy.get('.create-doi-button').should('not.exist');    

    cy.visit('/repositories/datacite.test/dois');
    cy.wait(waitTime2);

    // Create DOI button
    cy.get('.create-doi-button').should('not.exist');    
  });
});
