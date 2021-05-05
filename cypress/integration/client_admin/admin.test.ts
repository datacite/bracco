/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Acceptance: client_admin | admin', () => {
  const waitTime = 1000;
  const waitTimeAlt = 1000;

  before(function () {
    cy.login(Cypress.env('client_admin_username'), Cypress.env('client_admin_password'));
    cy.setCookie('_consent', 'true');
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_fabrica', '_consent');
  });

  it('is logged in', () => {
    cy.visit('/');
    cy.url().should('include', '/repositories/datacite.test');

    cy.get('ul.nav-tabs li.active a').should('contain', 'Settings');
    cy.get('h2.work').contains('DataCite Test Repository');
    cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');
  });
});
