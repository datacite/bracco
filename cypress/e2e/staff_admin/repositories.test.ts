/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Admin: Repositories Tabs', () => {
    const waitTime = 1000;
    const waitTime2 = 2000;
  
    before(function () {
      cy.login(Cypress.env('staff_admin_username'), Cypress.env('staff_admin_password'));
      cy.setCookie('_consent', 'true');
    })
  
    beforeEach(() => {
      // Move login to before function.
    });

    after(() => {
      Cypress.session.clearAllSavedSessions()
    })
  
    // ASSUMING DATACITE.TEST EXISTS:
    it('check repositories tabs for required components - assumes datacite.test exists', () => {
      cy.visit('/repositories/datacite.test');
      cy.wait(waitTime2);
  
      // Has left sidebar with create doi button.
      //cy.get('div#left-sidebar.col-md-3').should('be.visible').within(($sidebar) => {
      cy.get('[data-test-left-sidebar]').should('be.visible').within(($sidebar) => {
          // Create DOI button - would like to do more testing but seems impossible in Cypress.
        cy.get('.create-doi-button').contains(/Create DOI/i);
        cy.get('.create-doi-button button.dropdown-toggle').click({ force: true }).then(($obj) => {
          //cy.get('.create-doi-button ul.dropdown-menu')
          //cy.get('.create-doi-button ul.dropdown-menu ul li a').contains(/DOI\s*Form/i);
          //cy.get('.create-doi-button ul.dropdown-menu ul li a').contains(/File\s*Upload/i);
        });
      });

      cy.visit('/repositories/datacite.test/settings');
      cy.wait(waitTime2);
  
      // Has left sidebar with create doi button.
      //cy.get('div#left-sidebar.col-md-3').should('be.visible').within(($sidebar) => {
      cy.get('[data-test-left-sidebar]').should('be.visible').within(($sidebar) => {
          // Create DOI button - would like to do more testing but seems impossible in Cypress.
        cy.get('.create-doi-button').contains(/Create DOI/i);
        cy.get('.create-doi-button button.dropdown-toggle').click({ force: true }).then(($obj) => {
          //cy.get('.create-doi-button ul.dropdown-menu')
          //cy.get('.create-doi-button ul.dropdown-menu ul li a').contains(/DOI\s*Form/i);
          //cy.get('.create-doi-button ul.dropdown-menu ul li a').contains(/File\s*Upload/i);
        });
      });

      cy.visit('/repositories/datacite.test/prefixes');
      cy.wait(waitTime2);
  
      // Has left sidebar with create doi button.
      //cy.get('div#left-sidebar.col-md-3').should('be.visible').within(($sidebar) => {
      cy.get('[data-test-left-sidebar]').should('be.visible').within(($sidebar) => {
        // Create DOI button - would like to do more testing but seems impossible in Cypress.
        cy.get('.create-doi-button').contains(/Create DOI/i);
        cy.get('.create-doi-button button.dropdown-toggle').click({ force: true }).then(($obj) => {
          //cy.get('.create-doi-button ul.dropdown-menu')
          //cy.get('.create-doi-button ul.dropdown-menu ul li a').contains(/DOI\s*Form/i);
          //cy.get('.create-doi-button ul.dropdown-menu ul li a').contains(/File\s*Upload/i);
        });
      });

      cy.visit('/repositories/datacite.test/dois');
      cy.wait(waitTime2);
  
      // Has left sidebar with create doi button.
      //cy.get('div#left-sidebar.col-md-3').should('be.visible').within(($sidebar) => {
      cy.get('[data-test-left-sidebar]').should('be.visible').within(($sidebar) => {
        // Create DOI button - would like to do more testing but seems impossible in Cypress.
        cy.get('.create-doi-button').contains(/Create DOI/i);
        cy.get('.create-doi-button button.dropdown-toggle').click({ force: true }).then(($obj) => {
          //cy.get('.create-doi-button ul.dropdown-menu')
          //cy.get('.create-doi-button ul.dropdown-menu ul li a').contains(/DOI\s*Form/i);
          //cy.get('.create-doi-button ul.dropdown-menu ul li a').contains(/File\s*Upload/i);
        });
      });
    });
  });
  