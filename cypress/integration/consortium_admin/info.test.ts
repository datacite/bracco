/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('ACCEPTANCE: CONSORTIUM_ADMIN | INFO', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;

  before(function () {
    cy.login(Cypress.env('consortium_admin_username'), Cypress.env('consortium_admin_password'));
    cy.setCookie('_consent', 'true');
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_fabrica', '_jwt', '_consent');
    cy.wait(waitTime2);
  });

  it('is logged in to info page', () => {
    cy.visit('/providers/dc/info');
    cy.url().should('include', '/providers/dc/info').then(() => {

      cy.get('h2.work').contains('DataCite Consortium');
      cy.get('a#account_menu_link').should('contain', 'DC');

      cy.get('ul.nav-tabs li.active a').contains(/Info/i)
        .and('have.attr', 'href').and('include', '/providers/dc/info');
      cy.get('ul.nav-tabs li a').contains(/Settings/i)
        .and('have.attr', 'href').and('include', '/providers/dc');
      cy.get('ul.nav-tabs li a').contains(/Consortium Organizations/i)
        .and('have.attr', 'href').and('include', '/providers/dc/organizations');
      cy.get('ul.nav-tabs li a').contains(/Contacts/i)
        .and('have.attr', 'href').and('include', '/providers/dc/contacts');
      cy.get('ul.nav-tabs li a').contains(/Repositories/i)
        .and('have.attr', 'href').and('include', '/providers/dc/repositories');
      cy.get('ul.nav-tabs li a').contains(/Prefixes/i)
        .and('have.attr', 'href').and('include', '/providers/dc/prefixes');
      cy.get('ul.nav-tabs li a').contains(/DOIs/i)
        .and('have.attr', 'href').and('include', '/providers/dc/dois');

      cy.get('#chart-organization-title').parent().parent('.panel').within((panel) => {
        cy.get('#chart-organization-title').contains(/Organizations/i);
        cy.get('.member.graphs a').and('have.attr', 'href')
          .and('include', '/providers/dc/organizations');
        cy.get('#chart-organization');
      });

      cy.get('#chart-repository-title').parent().parent('.panel').within((panel) => {
        cy.get('#chart-repository-title').contains(/Repositories/i);
        cy.get('.member.graphs a').and('have.attr', 'href')
          .and('include', '/providers/dc/repositories');
        cy.get('#chart-repository');
      });

      cy.get('#chart-doi-title').parent().parent('.panel').within((panel) => {
        cy.get('#chart-doi-title').contains(/DOIs/i);
        cy.get('.member.graphs a').and('have.attr', 'href')
          .and('include', '/providers/dc/dois');
        cy.get('#chart-doi');
      });
    });
  });
});
