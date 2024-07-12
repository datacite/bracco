/// <reference types="cypress" />
/* eslint-disable no-undef */

function escapeRE(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

describe('ACCEPTANCE: CONSORTIUM_ADMIN | INFO', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;
  const waitTime3 = 3000;
  
  before(function () {
    cy.login(Cypress.env('consortium_admin_username'), Cypress.env('consortium_admin_password'));
    cy.setCookie('_consent', 'true');
    cy.wait(waitTime2);
  })

  beforeEach(() => {
    // TBD - set up test environment
  });

  after(function () {
    // TBD - Clean up any resources created for the test. (only local dev and stage).
    // cy.log('TBD - CLEAN UP RESOURCES AFTER TEST');
    cy.clearAllSessionStorage()
  });

  it('is logged in to homepage', () => {
    cy.visit('/providers/dc/');
    cy.url().should('include', '/providers/dc/').then(() => {

      // Has Fabrica logo and correct navbar color
      cy.get('img.fabrica-logo').should('exist').should('have.attr', 'src').should('include', 'fabrica-logo.svg');
      cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(36, 59, 84)');

      cy.get('h2.work').contains('DataCite Consortium');
      cy.get('a#account_menu_link').should('contain', 'DC');

      cy.get('ul.nav-tabs li.active a').contains(/Info/i)
        .and('have.attr', 'href').and('include', '/providers/dc');
      cy.get('ul.nav-tabs li a').contains(/Settings/i)
        .and('have.attr', 'href').and('include', '/providers/dc/settings');
      cy.get('ul.nav-tabs li a').contains(/Consortium Organizations/i)
        .and('have.attr', 'href').and('include', '/providers/dc/organizations');
      cy.get('ul.nav-tabs li a').contains(/Contacts/i)
        .and('have.attr', 'href').and('include', '/providers/dc/contacts');
      cy.get('ul.nav-tabs li a').contains(/Repositories/i)
        .and('have.attr', 'href').and('include', '/providers/dc/repositories');
      cy.get('ul.nav-tabs li a').contains(/Prefixes/i)
        .and('have.attr', 'href').and('include', '/providers/dc/prefixes');
      cy.get('ul.nav-tabs li a').contains(/DOIs/i)
        .and('have.attr', 'href').and('include', '/providers/dc/dois');

      cy.get('#chart-organization-title').parent().parent('.panel').within((panel) => {
        cy.get('#chart-organization-title').contains(/Organizations/i);
        cy.get('.member.graphs a').and('have.attr', 'href')
          .and('include', '/providers/dc/organizations');
        cy.get('#chart-organization');
      });

      cy.get('#chart-repository-title').parent().parent('.panel').within((panel) => {
        cy.get('#chart-repository-title').contains(/Repositories/i);
        cy.get('.member.graphs a').and('have.attr', 'href')
          .and('include', '/providers/dc/repositories');
        cy.get('#chart-repository');
      });

      cy.get('#chart-doi-title').parent().parent('.panel').within((panel) => {
        cy.get('#chart-doi-title').contains(/DOIs/i);
        cy.get('.member.graphs a').and('have.attr', 'href')
          .and('include', '/providers/dc/dois');
        cy.get('#chart-doi');
      });

      // Create DOI button
      cy.get('.create-doi-button').should('not.exist');    
    });
  });

  it('/settings redirects to homepage', () => {
    cy.visit('/settings');
    cy.url().should('include', '/providers/dc').then (() => {
      cy.get('a#account_menu_link').should('contain', 'DC');
    });
  });

  it('/providers redirects to homepage', () => {
    cy.visit('/providers');
    cy.url().should('include', '/providers/dc').then (() => {
      cy.get('a#account_menu_link').should('contain', 'DC');
    });
  });

  it('/contacts redirects to homepage', () => {
    cy.visit('/contacts');
    cy.url().should('include', '/providers/dc').then (() => {
      cy.get('a#account_menu_link').should('contain', 'DC');
    });
  });

  it('/repositories redirects to homepage', () => {
    cy.visit('/repositories');
    cy.url().should('include', '/providers/dc').then (() => {
      cy.get('a#account_menu_link').should('contain', 'DC');
    });
  });

  it('/prefixes redirects to homepage', () => {
    cy.visit('/prefixes');
    cy.url().should('include', '/providers/dc').then (() => {
      cy.get('a#account_menu_link').should('contain', 'DC');
    });
  });

  it('/dois redirects to homepage', () => {
    cy.visit('/dois');
    cy.url().should('include', '/providers/dc').then (() => {
      cy.get('a#account_menu_link').should('contain', 'DC');
    });
  });

  it('has password settings page', () => {
    cy.visit('/providers/dc/change');
    cy.url().should('include', '/providers/dc/change').then (() => {

      cy.get('h2.work').contains('DataCite Consortium');
      cy.get('a#account_menu_link').should('contain', 'DC');

      cy.get('h3').contains(/Set Password/i);

      cy.get('form').within(($form) => {
        cy.get('input#password-input-field').should('be.visible');
        cy.get('input#confirm-password-input-field').should('be.visible');
        cy.get('button[type=submit]').should('be.visible');
        cy.get('button').contains(/Cancel/i).should('be.visible');

        cy.get('button').contains(/Cancel/i).click({force: true})
      });
    });

    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("/providers/dc");
    });
  });

  // TBD - Could do more testing here. Only cursory testing for
  // presence of field objects. No testing of form behavior yet.
  it('has a member settings page', () => {
    cy.visit('/providers/dc/edit');
    cy.url().should('include', '/providers/dc/edit').then(() => {

      cy.get('h2.work').contains('DataCite Consortium');
      cy.get('a#account_menu_link').should('contain', 'DC');

      cy.get('h3.edit').contains(/Update\s*Member/);

      cy.get('form').within(($form) => {
        cy.get('h3.member-results').contains('Organization Information');
        cy.get('#member-id').should('be.visible');
        cy.get('#ror-id').should('be.visible');
        cy.get('#name').should('be.visible');
        cy.get('#display-name').should('be.visible');
        cy.get('#system-email').should('be.visible');
        cy.get('#group-email').should('be.visible');
        cy.get('#website').should('be.visible');
        cy.get('#twitter-handle').should('be.visible');
        cy.get('#organization-type').should('be.visible');
        cy.get('#focus-area').should('be.visible');
        cy.get('#description').should('be.visible');
        cy.get('#upload-file').contains(/Upload\s*Logo/);

        cy.get('h3.member-results').contains('Contact Information');
        cy.get('.alert-info').contains(/Contacts are created.*and then assigned roles here./i )
        cy.get('#voting-contact').should('be.visible');
        cy.get('#service-contact').should('be.visible');
        cy.get('#secondary-service-contact').should('be.visible');
        cy.get('#technical-contact').should('be.visible');
        cy.get('#secondary-technical-contact').should('be.visible');
        cy.get('#billing-contact').should('be.visible');
        cy.get('#secondary-billing-contact').should('be.visible');

        cy.get('h3.member-results').contains('Billing Information');
        cy.get('#billing-information-department').should('be.visible');
        cy.get('#billing-information-organization').should('be.visible');
        cy.get('#billing-information-street').should('be.visible');
        cy.get('#billing-information-city').should('be.visible');
        cy.get('#billing-information-postcode').should('be.visible');
        cy.get('#billing-information-country').should('be.visible');
        cy.get('.alert-warning').contains(/The contacts entered may receive notifications/i )
        cy.get('button#update-provider').should('be.visible');
        cy.get('button').contains(/Cancel/i).should('be.visible');

        cy.get('button.export-basic-metadata').should('not.exist');

        cy.get('button').contains(/Cancel/i).should('be.visible').click({force: true});
      })
    });

    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("/providers/dc");
    });
  });

  it.('can see info when using capitalized identifier URL subdirectory', () => {
    cy.visit('/providers/DC');
    cy.url().should('include', '/providers/DC').then(() => {
      
      cy.wait(waitTime3)
      // Info page should be populated with non-zero graph data.
      cy.get('.graphs > a').contains(/^0$/).should('not.exist')
    });
  });
});
