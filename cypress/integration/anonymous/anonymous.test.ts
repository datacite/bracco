/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('About', () => {
  beforeEach(() => {
    cy.setCookie('_consent', 'true');
    cy.visit('/about');
  });

  it('header', () => {
    cy.get('h3.member', { timeout: 30000 }).contains('About');
  });
});
