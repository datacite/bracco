/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Anonymous: Provider', () => {
  beforeEach(() => {
    cy.setCookie('_consent', 'true');
  });

  // the following pages require authentication. Redirects to homepage otherwise
  it('visiting specific doi', () => {
    cy.visit('/dois/10.80225%2Fda52-7919');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/dois/10.80225%2Fda52-7919');
    });
    cy.get('h2.work', { timeout: 30000 }).contains('10.80225/da52-7919');
  });
});
