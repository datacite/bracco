/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('ACCEPTANCE: ORGANIZATION_ADMIN | SETTINGS', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;

  before(function () {
    cy.login(Cypress.env('organization_admin_username'), Cypress.env('organization_admin_password'));
    cy.setCookie('_consent', 'true');
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_fabrica', '_jwt', '_consent');
    cy.wait(waitTime2);
  });

  it('is logged in to settings page', () => {
    cy.visit('/providers/datacite/settings');
    cy.url().should('include', '/providers/datacite/settings').then (() => {
      
      // Has Fabrica logo and correct navbar color
      cy.get('img.fabrica-logo').should('exist').should('have.attr', 'src').should('include', 'fabrica-logo.svg');
      cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(0, 177, 226)');
      
      cy.get('h2.work').contains('DataCite');
      cy.get('a#account_menu_link').should('contain', 'DATACITE');

      cy.get('ul.nav-tabs li a').contains(/Info/i)
        .and('have.attr', 'href').and('include', '/providers/datacite');
      cy.get('ul.nav-tabs li.active a').contains(/Settings/i)
        .and('have.attr', 'href').and('include', '/providers/datacite/settings');
      cy.get('ul.nav-tabs li a').contains(/Contacts/i)
        .and('have.attr', 'href').and('include', '/providers/datacite/contacts');
      cy.get('ul.nav-tabs li a').contains(/Repositories/i)
        .and('have.attr', 'href').and('include', '/providers/datacite/repositories');
      cy.get('ul.nav-tabs li a').contains(/Prefixes/i)
        .and('have.attr', 'href').and('include', '/providers/datacite/prefixes');
      cy.get('ul.nav-tabs li a').contains(/DOIs/i)
        .and('have.attr', 'href').and('include', '/providers/datacite/dois');

      cy.get('.btn-toolbar').within(($btnToolbar) => {
        cy.get('.btn-group-vertical a#set-password-provider').contains(/Set\s*Password/i)
          .and('have.attr', 'href').and('include', '/providers/datacite/change');
        cy.get('.btn-group-vertical a#edit-provider').contains(/Update\s*Organization/i)
          .and('have.attr', 'href').and('include', '/providers/datacite/edit');
      });

      cy.get('.metadata').within(($metadata) => {
        cy.get('h5').contains(/Record\s*created/i);
        cy.get('h5').contains(/Record\s*last\s*modified/i);
      });

      cy.get('h3.member-results').contains('Organization Information');

      cy.get('h5').contains(/Member\s*ID/i).parent().parent('.panel').within((panel) => {
        cy.get('h5').contains(/Member\s*ID/i);
        cy.get('div.panel-body').contains(/DATACITE/i);
        cy.get('h5').contains(/ROR ID/i);
        cy.get('a').contains('https://ror.org').and('have.attr', 'href').and('include', 'https://ror.org');
        cy.get('h5').contains(/Member\s*Type/i);
        cy.get('div.panel-body').contains(/Consortium\s*Organization/i);
        cy.get('h5').contains(/Tax\s*Status/i);
        cy.get('div.panel-body').contains(/Non-Profit/i);
        cy.get('h5').contains(/Organization\s*Name/i);
        cy.get('div.panel-body').contains(/DataCite/i);
        cy.get('h5').contains(/Consortium/i);
        cy.get('div.panel-body').contains(/DataCite\s*Consortium/i);
        cy.get('h5').contains(/System\s*Email/i);
        cy.get('a').contains('support@datacite.org').and('have.attr', 'href').and('include', 'mailto:support@datacite.org');
        cy.get('h5').contains(/Website/i);
        cy.get('a').contains('https://datacite.org').and('have.attr', 'href').and('include', 'https://datacite.org');
        cy.get('h5').contains(/Country/i);
        cy.get('div.panel-body').contains(/Germany/i);
        cy.get('h5').contains(/Organization\s*Type/i);
        cy.get('div.panel-body').contains(/Service\s*Provider/i);
        cy.get('h5').contains(/Focus\s*Area/i);
        cy.get('div.panel-body').contains(/Agricultural\s*Sciences/i);
      });

      cy.get('h3.member-results').contains('Contact Information');

      cy.get('h5').contains(/Service\s*Contact/i).parent().parent('.panel').within((panel) => {
        cy.get('h5').contains(/Service\s*Contact/i);
        // cy.get('[cy-data="service"] a').contains(/John\s*Doe/i).and('have.attr', 'href').and('include', 'mailto:John.Doe7426@example.org');
        cy.get('[cy-data="service"] a').contains(/John\s*Doe/i).and('have.attr', 'href').and('contain', 'mailto:John.Doe');
        cy.get('h5').contains(/Secondary\s*Service\s*Contact/i);
        //cy.get('[cy-data="secondary-service"] a').contains(/John\s*Doe/i).and('have.attr', 'href').and('include', 'mailto:John.Doe7426@example.org');
        cy.get('[cy-data="secondary-service"] a').contains(/John\s*Doe/i).and('have.attr', 'href').and('contain', 'mailto:John.Doe');
        cy.get('h5').contains(/Technical\s*Contact/i);
        // cy.get('[cy-data="technical"] a').contains(/John\s*Doe/i).and('have.attr', 'href').and('include', 'mailto:John.Doe7426@example.org');
        cy.get('[cy-data="technical"] a').contains(/John\s*Doe/i).and('have.attr', 'href').and('contain', 'mailto:John.Doe');
        cy.get('h5').contains(/Secondary\s*Technical\s*Contact/i);
        // cy.get('[cy-data="secondary-technical"] a').contains(/John\s*Doe/i).and('have.attr', 'href').and('include', 'mailto:John.Doe7426@example.org');
        cy.get('[cy-data="secondary-technical"] a').contains(/John\s*Doe/i).and('have.attr', 'href').and('contain', 'mailto:John.Doe');
      });
    });
  });
});