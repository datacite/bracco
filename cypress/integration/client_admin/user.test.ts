/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Acceptance: client_admin | user', () => {
  const waitTimeBetIt = 1000;
  const waitTime = 1000;
  const waitTime1 = 1000;

  beforeEach(() => {
    cy.setCookie('_consent', 'true');
    cy.setCookie('_fabrica', Cypress.env('client_admin_cookie'), { log: false });
    cy.wait(waitTimeBetIt);
  });

  it('visiting users', () => {
    cy.visit('/users');
    cy.url().should('include', '/repositories/datacite.test');
    cy.wait(waitTime);

    cy.get('h2.work').contains('DataCite Test Repository');
    cy.get('a#account_menu_link').contains('DATACITE.TEST');
    cy.get('ul.nav-tabs li.active a').contains("Settings");
  });

  it('visiting specific user', () => {
    cy.visit('/users/0000-0003-1419-2405');
    cy.url().should('include', '/users/0000-0003-1419-2405');
    cy.wait(waitTime);

    cy.get('h2.work').contains('Martin Fenner');
  });
});