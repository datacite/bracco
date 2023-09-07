/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Anonymous: Repository', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;

  before(function () {
    Cypress.session.clearCurrentSessionData()
    cy.clearCookies()
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
    cy.wait(waitTime2);
  })

  beforeEach(() => {
    cy.setCookie('_consent', 'true');
  });
  const site_title = new RegExp('Datacite.*Fabrica', 'i')

  // the following pages require authentication. Redirects to homepage otherwise
  it('visiting home page - testing for required elements', () => {
    cy.visit('/');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('div.motto h1').contains(site_title);

    // Create DOI button
    cy.get('.create-doi-button').should('not.exist');      
  });

  // the following pages require authentication. Redirects to homepage otherwise
  it('visiting repository DATACITE.TEST', () => {
    cy.visit('/repositories/datacite.test');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('div.motto h1').contains(site_title);
  });

  it('visiting repository DATACITE.TEST settings', () => {
    cy.visit('/repositories/datacite.test/settings');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('div.motto h1').contains(site_title);
  });

  it('visiting repository DATACITE.TEST prefixes', () => {
    cy.visit('/repositories/datacite.test/prefixes');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('div.motto h1').contains(site_title);
  });

  it('visiting repository DATACITE.TEST dois', () => {
    cy.visit('/repositories/datacite.test/dois');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('div.motto h1').contains(site_title);
  });
});
