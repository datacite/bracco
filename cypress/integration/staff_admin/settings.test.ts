/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('ACCEPTANCE: STAFF_ADMIN | SETTINGS', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;

  before(function () {
    cy.login(Cypress.env('staff_admin_username'), Cypress.env('staff_admin_password'));
    cy.setCookie('_consent', 'true');
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_fabrica', '_jwt', '_consent');
    cy.wait(waitTime2);
  });

  it('is logged in to settings page', () => {
    cy.visit('/settings');
    cy.url().should('include', '/settings').then (() => {

      cy.get('h2.work').contains('DataCite');
      cy.get('a#account_menu_link').should('contain', 'ADMIN');

      cy.get('ul.nav-tabs li a').contains(/Info/i)
        .and('have.attr', 'href').and('include', '/');
      cy.get('ul.nav-tabs li.active a').contains(/Settings/i)
        .and('have.attr', 'href').and('include', '/settings');
      cy.get('ul.nav-tabs li a').contains(/Members/i)
        .and('have.attr', 'href').and('include', '/providers');
      cy.get('ul.nav-tabs li a').contains(/Contacts/i)
        .and('have.attr', 'href').and('include', '/contacts');
      cy.get('ul.nav-tabs li a').contains(/Users/i)
        .and('have.attr', 'href').and('include', '/users');
      cy.get('ul.nav-tabs li a').contains(/Repositories/i)
        .and('have.attr', 'href').and('include', '/repositories');
      cy.get('ul.nav-tabs li a').contains(/Prefixes/i)
        .and('have.attr', 'href').and('include', '/prefixes');
      cy.get('ul.nav-tabs li a').contains(/DOIs/i)
        .and('have.attr', 'href').and('include', '/dois');

      cy.get('.btn-toolbar').within(($btnToolbar) => {
        cy.get('.btn-group-vertical a#set-password-provider').contains(/Set\s*Password/i)
          .and('have.attr', 'href').and('include', '/change');
        cy.get('.btn-group-vertical a#edit-provider').contains(/Update\s*Account/i)
          .and('have.attr', 'href').and('include', '/edit');
      });

      cy.get('.metadata').within(($metadata) => {
        cy.get('h5').contains(/Record\s*created/i);
        cy.get('h5').contains(/Record\s*last\s*modified/i);
      });

      cy.get('h5').contains(/Account\s*ID/i).parent().parent('.panel').within((panel) => {
        cy.get('h5').contains(/Account\s*ID/i);
        cy.get('div.panel-body').contains(/ADMIN/i);
        cy.get('h5').contains(/ROR ID/i);
        cy.get('a').contains('https://ror.org').and('have.attr', 'href').and('include', 'https://ror.org');
        cy.get('h5').contains(/System\s*Email/i);
        cy.get('a').contains('tech@datacite.org').and('have.attr', 'href').and('include', 'mailto:tech@datacite.org');
        cy.get('h5').contains(/Website/i);
        cy.get('a').contains('https://datacite.org').and('have.attr', 'href').and('include', 'https://datacite.org');
      });
    });
  });
});