/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Admin: Admin', () => {
  beforeEach(() => {
    cy.setCookie('_consent', 'true');
    cy.setCookie('_fabrica', Cypress.env('client_admin_cookie'), { log: false });
  });

  it('is logged in', () => {
    cy.visit('/');
    cy.url().should('include', '/repositories/datacite.test')
    cy.get('ul.nav-tabs li.active a').should('contain', 'Settings')
    cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');
  });

  it('visiting homepage', () => {
    cy.visit('/');
    cy.url().should('include', '/repositories/datacite.test')
    cy.get('ul.nav-tabs li.active a').should('contain', 'Settings')
    cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');
  });

  it('visiting info', () => {
    cy.visit('/info');
    cy.url().should('include', '/repositories/datacite.test')
    cy.get('ul.nav-tabs li.active a').should('contain', 'Settings')
    cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');
  });


  it('visiting providers', () => {
    cy.visit('/providers');
    cy.url().should('include', '/repositories/datacite.test')
    cy.get('ul.nav-tabs li.active a').should('contain', 'Settings')
    cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');
  });


  it('visiting repositories', () => {
    cy.visit('/repositories');
    cy.url().should('include', '/repositories/datacite.test')
    cy.get('ul.nav-tabs li.active a').should('contain', 'Settings')
    cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');
  });


  it('visiting settings', () => {
    cy.visit('/');
    cy.url().should('include', '/repositories/datacite.test')
    cy.get('ul.nav-tabs li.active a').should('contain', 'Settings')
    cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');
  });

  it('visiting prefixes', () => {
    cy.visit('/prefixes');
    cy.url().should('include', '/repositories/datacite.test')
    cy.get('ul.nav-tabs li.active a').should('contain', 'Settings')
    cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');
  });

  it('visiting dois', () => {
    cy.visit('/dois');
    cy.url().should('include', '/repositories/datacite.test')
    cy.get('ul.nav-tabs li.active a').should('contain', 'Settings')
    cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');
  });
}]; 