/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('ACCEPTANCE: STAFF_ADMIN | INFO', () => {
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

  it('is logged in to info page', () => {
    cy.visit('/info');
    cy.url().should('include', '/info').then(() => {

      // Has Fabrica logo and correct navbar color
      cy.get('img.fabrica-logo').should('exist').should('have.attr', 'src').should('include', 'fabrica-logo.svg');
      cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(36, 59, 84)');

      cy.get('h2.work').contains('DataCite');
      cy.get('a#account_menu_link').should('contain', 'ADMIN');

      cy.get('ul.nav-tabs li.active a').contains(/Info/i)
        .and('have.attr', 'href').and('include', '/info');
      cy.get('ul.nav-tabs li a').contains(/Settings/i)
        .and('have.attr', 'href').and('include', '/');
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

      cy.get('#chart-member-title').parent().parent('.panel').within((panel) => {
        cy.get('#chart-member-title').contains(/Members/i);
        cy.get('.member.graphs a').and('have.attr', 'href')
          .and('include', '/providers');
        cy.get('#chart-member');
      });

      cy.get('#chart-repository-title').parent().parent('.panel').within((panel) => {
        cy.get('#chart-repository-title').contains(/Repositories/i);
        cy.get('.member.graphs a').and('have.attr', 'href')
          .and('include', '/repositories');
        cy.get('#chart-repository');
      });

      cy.get('#chart-doi-title').parent().parent('.panel').within((panel) => {
        cy.get('#chart-doi-title').contains(/DOIs/i);
        cy.get('.member.graphs a').and('have.attr', 'href')
          .and('include', '/dois');
        cy.get('#chart-doi');
      });
    });
  });
});
