/// <reference types="cypress" />
/* eslint-disable no-undef */

function escapeRE(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

describe('ACCEPTANCE: STAFF_ADMIN | INFO', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;

  before(function () {
    cy.login(Cypress.env('staff_admin_username'), Cypress.env('staff_admin_password'));
    cy.setCookie('_consent', 'true');
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_fabrica', '_jwt', '_consent');
    cy.wait(waitTime2);
  });

  it('is logged in to info page', () => {
    cy.visit('/');
    cy.url().should('include', '/').then(() => {

      cy.get('h2.work').contains('DataCite');
      cy.get('a#account_menu_link').should('contain', 'ADMIN');

      cy.get('ul.nav-tabs li.active a').contains(/Info/i)
        .and('have.attr', 'href').and('include', '/');
      cy.get('ul.nav-tabs li a').contains(/Settings/i)
        .and('have.attr', 'href').and('include', '/settings');
      cy.get('ul.nav-tabs li a').contains(/Members/i)
        .and('have.attr', 'href').and('include', '/providers');
      cy.get('ul.nav-tabs li a').contains(/Contacts/i)
        .and('have.attr', 'href').and('include', '/contacts');
      cy.get('ul.nav-tabs li a').contains(/Users/i)
        .and('have.attr', 'href').and('include', '/users');
      cy.get('ul.nav-tabs li a').contains(/Repositories/i)
        .and('have.attr', 'href').and('include', '/repositories');
      cy.get('ul.nav-tabs li a').contains(/Prefixes/i)
        .and('have.attr', 'href').and('include', '/prefixes');
      cy.get('ul.nav-tabs li a').contains(/DOIs/i)
        .and('have.attr', 'href').and('include', '/dois');

      cy.get('#chart-member-title').parent().parent('.panel').within((panel) => {
        cy.get('#chart-member-title').contains(/Members/i);
        cy.get('.member.graphs a').and('have.attr', 'href')
          .and('include', '/providers');
        cy.get('#chart-member');
      });

      cy.get('#chart-repository-title').parent().parent('.panel').within((panel) => {
        cy.get('#chart-repository-title').contains(/Repositories/i);
        cy.get('.member.graphs a').and('have.attr', 'href')
          .and('include', '/repositories');
        cy.get('#chart-repository');
      });

      cy.get('#chart-doi-title').parent().parent('.panel').within((panel) => {
        cy.get('#chart-doi-title').contains(/DOIs/i);
        cy.get('.member.graphs a').and('have.attr', 'href')
          .and('include', '/dois');
        cy.get('#chart-doi');
      });

      // Create DOI button - would like to do more testing but seems impossible in Cypress.
      cy.get('.create-doi-button').should('not.exist');
    });
  });

  it('/settings - no redirect', () => {
    cy.visit('/settings');
    cy.url().should('include', '/settings').then (() => {
      cy.get('h2.work').contains('DataCite');
      cy.get('a#account_menu_link').should('contain', 'ADMIN');
    });
  });

  it('/providers - no redirect', () => {
    cy.visit('/providers');
    cy.url().should('include', '/providers').then (() => {
      cy.get('h2.work').contains('DataCite');
      cy.get('a#account_menu_link').should('contain', 'ADMIN');
    });
  });

  it('/contacts - no redirect', () => {
    cy.visit('/contacts');
    cy.url().should('include', '/contacts').then (() => {
      cy.get('h2.work').contains('DataCite');
      cy.get('a#account_menu_link').should('contain', 'ADMIN');
    });
  });

  it('/users - no redirect', () => {
    cy.visit('/users');
    cy.url().should('include', '/users').then (() => {
      cy.get('h2.work').contains('DataCite');
      cy.get('a#account_menu_link').should('contain', 'ADMIN');
    });
  });

  it('/repositories - no redirect', () => {
    cy.visit('/repositories');
    cy.url().should('include', '/repositories').then (() => {
      cy.get('h2.work').contains('DataCite');
      cy.get('a#account_menu_link').should('contain', 'ADMIN');
    });
  });

  it('/prefixes - no redirect', () => {
    cy.visit('/prefixes');
    cy.url().should('include', '/prefixes').then (() => {
      cy.get('h2.work').contains('DataCite');
      cy.get('a#account_menu_link').should('contain', 'ADMIN');
    });
  });

  it('/dois - no redirect', () => {
    cy.visit('/dois');
    cy.url().should('include', '/dois').then (() => {
      cy.get('h2.work').contains('DataCite');
      cy.get('a#account_menu_link').should('contain', 'ADMIN');
    });
  });

  it('has password settings page', () => {
    cy.visit('/change');
    cy.url().should('include', '/change').then (() => {

      cy.get('h2.work').contains('DataCite');
      cy.get('a#account_menu_link').should('contain', 'ADMIN');

      cy.get('h3').contains(/Set Password/i);

      cy.get('form').within(($form) => {
        cy.get('input#password-input-field').should('be.visible');
        cy.get('input#confirm-password-input-field').should('be.visible');
        cy.get('button[type=submit]').should('be.visible');
        cy.get('button').contains(/Cancel/i).should('be.visible');

        cy.get('button').contains(/Cancel/i).click({force:true});
      });
    });

    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("/");
    });
  });

  // TBD - Could do more testing here. Only cursory testing for
  // presence of field objects. No testing of form behavior yet.
  it('has an account settings page', () => {
    cy.visit('/edit');
    cy.url().should('include', '/edit').then(() => {

      cy.get('h2.work').contains('DataCite');
      cy.get('a#account_menu_link').should('contain', 'ADMIN');

      cy.get('form').within(($form) => {
        cy.get('#member-id').should('be.visible');
        cy.get('#ror-id').should('be.visible');
        cy.get('#system-email').should('be.visible');
        cy.get('#website').should('be.visible');
        cy.get('#twitter-handle').should('be.visible');
        cy.get('#description').should('be.visible');
        cy.get('#country').should('be.visible');
        cy.get('button#update-provider').should('be.visible');
        cy.get('button').contains(/Cancel/i).should('be.visible');

        cy.get('button').contains(/Cancel/i).click({force:true});
      });
    });
    
    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("/");
    });
  });
});