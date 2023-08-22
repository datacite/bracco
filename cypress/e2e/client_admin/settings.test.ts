/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('ACCEPTANCE: CLIENT_ADMIN | SETTINGS', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;

  before(function () {
    cy.login(Cypress.env('client_admin_username'), Cypress.env('client_admin_password'));
    cy.setCookie('_consent', 'true');
    cy.wait(waitTime2);
  })

  beforeEach(() => {
    // TBD - set up test environment
  });

  it('is logged in to settings page', () => {
    cy.visit('/repositories/datacite.test/settings');
    cy.url().should('include', '/repositories/datacite.test/settings').then (() => {

      // Has Fabrica logo
      cy.get('img.fabrica-logo').should('exist').should('have.attr', 'src').should('include', 'fabrica-logo.svg');
      
      cy.get('h2.work').contains('DataCite Test Repository');
      cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');

      cy.get('ul.nav-tabs li a').contains(/Info/i)
        .and('have.attr', 'href').and('include', '/repositories/datacite.test');
      cy.get('ul.nav-tabs li.active a').contains(/Settings/i)
        .and('have.attr', 'href').and('include', '/repositories/datacite.test/settings');
      cy.get('ul.nav-tabs li a').contains(/Prefixes/i)
        .and('have.attr', 'href').and('include', '/repositories/datacite.test/prefixes');
      cy.get('ul.nav-tabs li a').contains(/DOIs/i)
        .and('have.attr', 'href').and('include', '/repositories/datacite.test/dois');

      // Has left sidebar buttons.
      cy.get('[data-test-left-sidebar]').should('be.visible').within(($sidebar) => {

        // Create DOI button - would like to do more testing but seems impossible in Cypress.
        cy.get('.create-doi-button').contains(/Create DOI/i);
        cy.get('.create-doi-button button.dropdown-toggle').click({ force: true }).then(($obj) => {
          //cy.get('.create-doi-button ul.dropdown-menu')
          //cy.get('.create-doi-button ul.dropdown-menu ul li a').contains(/DOI\s*Form/i);
          //cy.get('.create-doi-button ul.dropdown-menu ul li a').contains(/File\s*Upload/i);
        });
      });

      cy.get('.btn-toolbar').within(($btnToolbar) => {
        cy.get('.btn-group-vertical a#set-password-repository').contains(/Set\s*Password/i)
          .and('have.attr', 'href').and('include', '/repositories/datacite.test/change');
        cy.get('.btn-group-vertical a#edit-repository').contains(/Update\s*Repository/i)
          .and('have.attr', 'href').and('include', '/repositories/datacite.test/edit');
      })

      cy.get('button.export-basic-metadata').should('not.exist');

      cy.get('.metadata').within(($metadata) => {
        cy.get('h5').contains(/Record\s*created/i);
        cy.get('h5').contains(/Record\s*last\s*modified/i);
      })

      cy.get('h5').contains(/Repository\s*ID/i).parent().parent('.panel').within((panel) => {
        cy.get('h5').contains(/Repository\s*ID/i);
        cy.get('div.panel-body').contains(/DATACITE.TEST/i);
        cy.get('h5').contains(/Description/i);
        cy.get('h5').contains(/System\s*Email/i);
        cy.get('a').contains('mfenner@datacite.org').and('have.attr', 'href').and('include', 'mailto:mfenner@datacite.org');
        cy.get('h5').contains(/Domain/i);      });
    });
  });
});