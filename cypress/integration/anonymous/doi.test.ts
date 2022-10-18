/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('ACCEPTANCE: ANONYMOUS - DOI', () => {
  beforeEach(() => {
    cy.setCookie('_consent', 'true');
  });

  // the following pages require authentication. Redirects to homepage otherwise
  it('visiting specific doi', () => {
    cy.visit('/dois/10.80225%2Fda52-7919');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/dois/10.80225%2Fda52-7919');
    });
    cy.get('a#sign-in').should('exist');

    cy.get('h2.work').contains('10.80225/da52-7919');
    cy.get('img.fabrica-logo').should('exist').should('have.attr', 'src').should('include', 'fabrica-logo.svg');
    cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(0, 177, 226)');
  });
});
