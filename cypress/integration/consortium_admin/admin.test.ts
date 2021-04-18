/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Acceptance: consortium_admin, admin', () => {
  const waitTimeBetIt = 1000;
  const waitTime = 1000;
  const waitTime1 = 1000;

  beforeEach(() => {
    cy.setCookie('_consent', 'true');
    cy.setCookie('_fabrica', Cypress.env('consortium_admin_cookie'), { log: false });
    cy.wait(waitTimeBetIt);
  });

  it('editing admin form', () => {
    cy.visit('/providers/dc/edit');
    cy.url().should('include', '/providers/dc/edit');
    cy.wait(waitTime);

    cy.get('input#member-id-field').should('exist');
    cy.get('input#system-email-field').should('exist');
    cy.get('input#website-field').should('exist');
    cy.get('input#twitter-handle-field').should('exist');
    cy.get('div#ror-id').should('exist');
    cy.get('div#country').should('exist');
    cy.get('textarea#description-field').should('exist');

    cy.get('button#update-provider').contains('Update Member');
  });

  it('editing admin password form', () => {
    cy.visit('/providers/dc/change');
    cy.url().should('include', '/providers/dc/change');
    cy.wait(waitTime);

    cy.get('input#password-input-field').should('exist');
    cy.get('input#confirm-password-input-field').should('exist');

    cy.get('button[type=submit]').contains('Set Password');
  });

  it('is logged in', () => {
    cy.visit('/');
    cy.url().should('include', '/providers/dc');
    cy.wait(waitTime);

    cy.get('h2.work').contains('DataCite Consortium');
    cy.get('ul.nav-tabs li.active a').should('contain', 'Settings');
    cy.get('a#account_menu_link').should('contain', 'DC');
  });

  it('visiting homepage', () => {
    cy.visit('/');
    cy.url().should('include', '/providers/dc');
    cy.wait(waitTime);

    cy.get('h2.work').contains('DataCite Consortium');
    cy.get('ul.nav-tabs li.active a').should('contain', 'Settings');
    cy.get('a#account_menu_link').should('contain', 'DC');
  });

  it('visiting info', () => {
    cy.visit('/providers/dc/info');
    cy.url().should('include', '/providers/dc/info');
    cy.wait(waitTime);

    cy.get('h2.work').contains('DataCite Consortium');
    cy.get('ul.nav-tabs li.active a').should('contain', 'Info');
    cy.get('a#account_menu_link').should('contain', 'DC');
  });

  it('visiting settings', () => {
    cy.visit('/');
    cy.url().should('include', '/providers/dc');
    cy.wait(waitTime);

    cy.get('h2.work').contains('DataCite Consortium');
    cy.get('ul.nav-tabs li.active a').should('contain', 'Settings');
    cy.get('a#account_menu_link').should('contain', 'DC');
  });

  it('visiting consortium organizations', () => {
    cy.visit('/providers/dc/organizations');
    cy.url().should('include', '/providers/dc/organizations');
    cy.wait(waitTime);

    cy.get('h2.work').contains('DataCite Consortium');
    cy.get('ul.nav-tabs li.active a').should('contain', 'Consortium Organizations');
    cy.get('a#account_menu_link').should('contain', 'DC');

    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');
  });

  it('visiting contacts', () => {
    cy.visit('/providers/dc/contacts');
    cy.url().should('include', '/providers/dc/contacts');
    cy.wait(waitTime);

    cy.get('h2.work').contains('DataCite Consortium');
    cy.get('ul.nav-tabs li.active a').should('contain', 'Contacts');
    cy.get('a#account_menu_link').should('contain', 'DC');

    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    cy.get('a#add-contact').should('exist');
  });

  it('visiting repositories', () => {
    cy.visit('/providers/dc/repositories');
    cy.url().should('include', '/providers/dc/repositories');
    cy.wait(waitTime);

    cy.get('h2.work').contains('DataCite Consortium');
    cy.get('ul.nav-tabs li.active a').should('contain', 'Repositories');
    cy.get('a#account_menu_link').should('contain', 'DC');

    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    // staff can't add repositories here (needs to go to provider first)
    cy.get('a#add-repository').should('not.exist');
    cy.get('.alert').contains("New repositories can't be created from this page.");
  });

  it('visiting prefixes', () => {
    cy.visit('/providers/dc/prefixes');
    cy.url().should('include', '/providers/dc/prefixes');
    cy.wait(waitTime);

    cy.get('h2.work').contains('DataCite Consortium');
    cy.get('ul.nav-tabs li.active a').should('contain', 'Prefixes');
    cy.get('a#account_menu_link').should('contain', 'DC');
 
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    cy.get('a#add-prefixes').should('not.exist');
    cy.get('.alert').contains("New prefixes can't be assigned from this page.");
  });

  it('visiting dois', () => {
    cy.visit('/providers/dc/dois');
    cy.url().should('include', '/providers/dc/dois');
    cy.wait(waitTime);

    cy.get('h2.work').contains('DataCite Consortium');
    cy.get('ul.nav-tabs li.active a').should('contain', 'DOIs');
    cy.get('a#account_menu_link').should('contain', 'DC');

    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    // staff can't add doi here (needs to go to repository first)
    cy.get('a#add-doi').should('not.exist');
  });

  it('visiting prefix 10.80225', () => {
    cy.visit('/providers/dc/prefixes/10.80225');
    cy.url().should('include', '/providers/dc/prefixes/10.80225');
    cy.wait(waitTime);

    cy.get('div.alert-warning').contains('The prefix was not found.');
  });
});
