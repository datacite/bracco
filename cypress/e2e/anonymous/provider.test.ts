/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('ACCEPTANCE: ANONYMOUS - PROVIDER', () => {
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

  it('visiting provider DATACITE', () => {
    cy.visit('/providers/datacite');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('div.motto h1').contains(site_title);
  });


  it('visiting provider DATACITE settings', () => {
    cy.visit('/providers/datacite/settings');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('div.motto h1').contains(site_title);
  });

  it('visiting provider DATACITE repositories', () => {
    cy.visit('/providers/datacite/repositories');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('div.motto h1').contains(site_title);
  });

  it('visiting provider DATACITE prefixes', () => {
    cy.visit('/providers/datacite/prefixes');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('div.motto h1').contains(site_title);
  });

  it('visiting provider DATACITE dois', () => {
    cy.visit('/providers/datacite/dois');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('div.motto h1').contains(site_title);
  });
});
