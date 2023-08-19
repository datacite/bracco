/// <reference types="cypress" />
/* eslint-disable no-undef */

function escapeRE(string) {
  //return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

describe('ACCEPTANCE: CONSORTIUM_ADMIN | DOIS', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;
  const prefix = '';
  let suffix = '';

  before(function () {
    cy.login(Cypress.env('consortium_admin_username'), Cypress.env('consortium_admin_password'));
    cy.setCookie('_consent', 'true');

    cy.wait(waitTime2);
  });

  beforeEach(() => {
    // Move login to before function.
  });

  after(function () {
    // cy.log('TBD - CLEAN UP RESOURCES AFTER TEST');
  });

  // Check for page elements.
  it('is logged in to dois page', () => {
    cy.visit('/providers/dc/dois');
    cy.url().should('include', '/providers/dc/dois').then(() => {
      
      // Has Fabrica logo and correct navbar color
      cy.get('img.fabrica-logo').should('exist').should('have.attr', 'src').should('include', 'fabrica-logo.svg');
      cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(36, 59, 84)');

      // Has upper right user profile link.
      cy.get('h2.work').contains('DataCite Consortium');
      cy.get('a#account_menu_link').should('contain', 'DC');

      // Has the correct tab activated.
      cy.get('ul.nav-tabs li.active a').contains(/DOIs/i)
        .and('have.attr', 'href').and('include', '/providers/dc/dois');

      // Does not have left sidebar functions.
      cy.get('.btn-group-vertical a#new-doi').should('not.exist');
      cy.get('.btn-group-vertical a#upload-doi').should('not.exist');

      cy.get('button.export-basic-metadata').should('not.exist');

      // Has left sidebar facets.
      cy.get('.facets h4').contains(/State/i);
      cy.get('.facets h4').contains(/Resource\s*Type/i);
      cy.get('.facets h4').contains(/Year\s*created/i);
      cy.get('.facets h4').contains(/Repository/i);
      cy.get('.facets h4').contains(/Prefix/i);
      cy.get('.facets h4').contains(/Schema\s*Version/i);
      cy.get('.facets h4').contains(/Link\s*Check\s*Status/i);

      // Has search form
      cy.get('form #search').within(($searchBar) => {
        cy.get('input[name="query"]')
          .and('have.attr', 'placeholder').should('match', /Type\sto\ssearch\.\sFor\sexample\s10\.4121\/17185607\.v1/i);
        cy.get('button').contains(/Search/i);
      });

      // DOI total.
      cy.get('[data-test-results]').contains(/DOIs/i);

      // Sort.
      cy.get('#sort select').contains(/Sort by Date Updated/i);
      cy.get('#sort select').contains(/Sort by Date Created/i);
      cy.get('#sort select').contains(/Sort by DOI/i);
      cy.get('#sort select').contains(/Sort Alphabetically/i);
      cy.get('#sort select').contains(/Sort by Relevance/i);

      // Has search results as content.
      cy.get('#content').within(($content) => {
        cy.get('[data-test-doi]').its('length').should('be.gte', 1);
      });

      // Create DOI button
      cy.get('.create-doi-button').should('not.exist');    
    });
  });
});
