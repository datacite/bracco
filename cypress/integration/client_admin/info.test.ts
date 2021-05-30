/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('ACCEPTANCE: CLIENT_ADMIN | INFO', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;

  before(function () {
    cy.login(Cypress.env('client_admin_username'), Cypress.env('client_admin_password'));
    cy.setCookie('_consent', 'true');
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_fabrica', '_jwt', '_consent');
    cy.wait(waitTime2);
  });

  it('is logged in to info page', () => {
    cy.visit('/repositories/datacite.test/info');
    cy.url().should('include', '/repositories/datacite.test/info').then(() => {

      cy.get('h2.work').contains('DataCite Test Repository');
      cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');

      cy.get('ul.nav-tabs li.active a').contains(/Info/i)
        .and('have.attr', 'href').and('include', '/repositories/datacite.test/info');
      cy.get('ul.nav-tabs li a').contains(/Settings/i)
        .and('have.attr', 'href').and('include', '/repositories/datacite.test');
      cy.get('ul.nav-tabs li a').contains(/Prefixes/i)
        .and('have.attr', 'href').and('include', '/repositories/datacite.test/prefixes');
      cy.get('ul.nav-tabs li a').contains(/DOIs/i)
        .and('have.attr', 'href').and('include', '/repositories/datacite.test/dois');

      cy.get('body .content').within(($body) => {
        cy.get('#chart-doi-title').contains(/DOIs\s*by\s*year/i);
        cy.get('.member.graphs a').and('have.attr', 'href')
          .and('include', '/repositories/datacite.test/dois');
        cy.get('#chart-doi');
      })
    });
  });
});
