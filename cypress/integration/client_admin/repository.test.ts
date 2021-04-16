/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Acceptance: client_admin | repository', () => {
  const waitTimeBetIt = 1000;
  const waitTime = 1000;
  const waitTime1 = 1000;

  beforeEach(() => {
    cy.setCookie('_consent', 'true');
    cy.setCookie('_fabrica', Cypress.env('client_admin_cookie'), { log: false });
    cy.wait(waitTimeBetIt);
  });

  it('visiting repository DataCite Test', () => {
    cy.visit('/repositories/datacite.test');
    cy.url().should('include', '/repositories/datacite.test');
    cy.wait(waitTime);

    cy.get('h2.work').contains('DataCite Test Repository');
    cy.get('a#account_menu_link').contains('DATACITE.TEST');
    cy.get('ul.nav-tabs li.active a').contains("Settings");

    cy.get('a#edit-repository').contains('Update Repository');
    cy.get('a#delete-repository').should('not.exist');
  });

  it('visiting repository DataCite Test info', () => {
    cy.visit('/repositories/datacite.test/info');
    cy.url().should('include', '/repositories/datacite.test/info');
    cy.wait(waitTime);

    cy.get('h2.work').contains('DataCite Test Repository');
    cy.get('a#account_menu_link').contains('DATACITE.TEST');
    cy.get('ul.nav-tabs li.active a').contains("Info");

    // repository charts are displayed
    cy.get('#chart-doi-title').contains('DOIs by year');
  });

  it('visiting repository DataCite Test prefixes', () => {
    cy.visit('/repositories/datacite.test/prefixes');
    cy.url().should('include', '/repositories/datacite.test/prefixes');
    cy.wait(waitTime);

    cy.get('h2.work').contains('DataCite Test Repository');
    cy.get('a#account_menu_link').contains('DATACITE.TEST');
    cy.get('ul.nav-tabs li.active a').contains("Prefixes");

    // repository charts are displayed
    cy.get('div#search').should('exist');

    // at least one prefix exists
    cy.get('[data-test-results]').contains('Prefixes');
    cy.get('[data-test-prefix]').should('exist');
    cy.get('div.panel.facets').should('exist');

    // client can't assign new prefix
    cy.get('a#assign-prefix').should('not.exist');
  });

  it('visiting repository DataCite Test dois', () => {
    cy.visit('/repositories/datacite.test/dois');
    cy.url().should('include', '/repositories/datacite.test/dois');
    cy.wait(waitTime);

    cy.get('h2.work').contains('DataCite Test Repository');
    cy.get('a#account_menu_link').contains('DATACITE.TEST');
    cy.get('ul.nav-tabs li.active a').contains("DOIs");

    // repository charts are displayed
    cy.get('div#search').should('exist');

    // at least one doi exists
    cy.get('[data-test-results]').contains('DOIs');
    cy.get('[data-test-doi]').should('exist');
    cy.get('div.panel.facets').should('exist');

    // client can add dois
    cy.get('a#new-doi').contains('Create (Form)');
    cy.get('a#upload-doi').contains('Create (File Upload)');

    cy.get('a#transfer-dois').should('not.exist');
  });

  it('editing repository DataCite Test form', () => {
    cy.visit('/repositories/datacite.test/edit');
    cy.url().should('include', '/repositories/datacite.test/edit');
    cy.wait(waitTime);

    cy.get('h2.work').contains('DataCite Test Repository');
    cy.get('a#account_menu_link').contains('DATACITE.TEST');
    cy.get('div.tab-content').should('exist');

    cy.get('button#update-repository').contains('Update Account')
  });

  it('editing repository DataCite Test password form', () => {
    cy.visit('/repositories/datacite.test/change');
    cy.url().should('include', '/repositories/datacite.test/change');
    cy.wait(waitTime);

    cy.get('h2.work').contains('DataCite Test Repository');
    cy.get('a#account_menu_link').contains('DATACITE.TEST');
    cy.get('div.tab-content').should('exist');

    cy.get('input#password-input-field').should('exist');
    cy.get('input#confirm-password-input-field').should('exist');

    cy.get('button[type=submit]').contains('Set Password')
  });
});