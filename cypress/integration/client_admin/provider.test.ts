/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Acceptance: client_admin | provider', () => {
  const waitTimeBetIt = 1000;
  const waitTime = 1000;
  const waitTime1 = 1000;

  beforeEach(() => {
    cy.setCookie('_consent', 'true');
    cy.setCookie('_fabrica', Cypress.env('client_admin_cookie'), { log: false });
    cy.wait(waitTimeBetIt);
  });

  it('visiting provider DataCite info', () => {
    cy.visit('/providers/datacite/info');
    cy.url().should('include', '/repositories/datacite.test');
    cy.get('h2.work').contains('DataCite Test Repository');
    cy.get('ul.nav-tabs li.active a').should('contain', 'Settings');
    cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');
  });

  it('visiting provider DataCite repositories', () => {
    cy.visit('/providers/datacite/repositories');
    cy.url().should('include', '/repositories/datacite.test');
    cy.get('h2.work').contains('DataCite Test Repository');
    cy.get('ul.nav-tabs li.active a').should('contain', 'Settings');
    cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');
  });

  it('visiting providers', () => {
    cy.visit('/providers');
    cy.url().should('include', '/repositories/datacite.test');
    cy.get('h2.work').contains('DataCite Test Repository');
    cy.get('ul.nav-tabs li.active a').should('contain', 'Settings');
    cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');
  });

  it('visiting provider DataCite prefixes', () => {
    cy.visit('/providers/datacite/prefixes');
    cy.url().should('include', '/repositories/datacite.test');
    cy.get('h2.work').contains('DataCite Test Repository');
    cy.get('ul.nav-tabs li.active a').should('contain', 'Settings');
    cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');
  });

  it('visiting provider DataCite dois', () => {
    cy.visit('providers/datacite/dois');
    cy.url().should('include', '/repositories/datacite.test');
    cy.get('h2.work').contains('DataCite Test Repository');
    cy.get('ul.nav-tabs li.active a').should('contain', 'Settings');
    cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');
  });
});