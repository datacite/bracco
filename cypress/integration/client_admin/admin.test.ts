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

//   it('visiting homepage', () => {
//     cy.visit('/');
//     cy.url().should('include', '/repositories/datacite.test');
//     cy.wait(waitTime);

//     cy.get('ul.nav-tabs li.active a').should('contain', 'Settings');
//     cy.get('h2.work').contains('DataCite Test Repository');
//     cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');
//   });

//   it('visiting repository DataCite Test info', () => {
//     cy.visit('/repositories/datacite.test/info');
//     cy.url().should('include', '/repositories/datacite.test/info');
//     cy.wait(waitTime);

//     cy.contains('ul.nav-tabs li.active a', "Info");
//     cy.get('h2.work').contains('DataCite Test Repository');
//     cy.get('a#account_menu_link').contains('DATACITE.TEST');
//   });

//   it('visiting repository DataCite Test settings', () => {
//     cy.visit('/repositories/datacite.test');
//     cy.url().should('include', '/repositories/datacite.test');
//     cy.wait(waitTime);

//     cy.contains('ul.nav-tabs li.active a', "Settings");
//     cy.get('h2.work').contains('DataCite Test Repository');
//     cy.get('a#account_menu_link').contains('DATACITE.TEST');
//   });

//   it('visiting repository DataCite Test prefixes', () => {
//     cy.visit('/repositories/datacite.test/prefixes');
//     cy.url().should('include', '/repositories/datacite.test/prefixes');
//     cy.wait(waitTime);

//     cy.contains('ul.nav-tabs li.active a', "Prefixes");
//     cy.get('h2.work').contains('DataCite Test Repository');
//     cy.get('a#account_menu_link').contains('DATACITE.TEST');
//   });

//   it('visiting dois', () => {
//     cy.visit('/repositories/datacite.test/dois');
//     cy.url().should('include', '/repositories/datacite.test/dois');
//     cy.wait(waitTime);

//     cy.contains('ul.nav-tabs li.active a', "DOIs");
//     cy.get('h2.work').contains('DataCite Test Repository');
//     cy.get('a#account_menu_link').contains('DATACITE.TEST');
//   });

//   it('visiting specific doi', () => {
//     cy.visit('/dois/10.80225%2Fda52-7919');
//     cy.url().should('include', '/dois/10.80225%2Fda52-7919');
//     cy.wait(waitTime);

//     cy.contains('h2.work', "10.80225/da52-7919");
//   });
}];
