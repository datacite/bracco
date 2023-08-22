/// <reference types="cypress" />
/* eslint-disable no-undef */

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

describe('ACCEPTANCE: CONSORTIUM_ADMIN | SETTINGS', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;
  const min = 500000;
  const max = 999999;
  const consortium_id = Cypress.env('consortium_admin_username').toLowerCase()
  const test_contact_given_name = "Jack"
  const test_contact_family_name_prefix = "ConsortiumAdmin"

  before(function () {
    const rndInt = randomIntFromInterval(min, max);
    given_name = test_contact_given_name;
    family_name = test_contact_family_name_prefix + rndInt;
    email = given_name + '.' + family_name + '@example.org';
    type = 'providers';
    roles = ["voting", "service", "secondary_service", "technical", "secondary_technical", "billing"];

    cy.login(Cypress.env('consortium_admin_username'), Cypress.env('consortium_admin_password'));
    cy.setCookie('_consent', 'true');
    cy.wait(waitTime2);

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, consortium_id, Cypress.env('api_url'), cookie.value)
    })
  })

  beforeEach(() => {
    // TBD - set up test environment
  });

  after(() => {
    cy.getCookie('_jwt').then((cookie) => {
      cy.deleteProviderTestContacts(consortium_id, test_contact_family_name_prefix, Cypress.env('api_url'), cookie.value)
    })
    cy.clearAllSessionStorage()
  })

  it('is logged in to settings page', () => {
    cy.visit('/providers/' + consortium_id + '/settings');
    cy.url().should('include', '/providers/' + consortium_id + '/settings').then (() => {
      
      // Has Fabrica logo and correct navbar color
      cy.get('img.fabrica-logo').should('exist').should('have.attr', 'src').should('include', 'fabrica-logo.svg');
      cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(36, 59, 84)');
      
      cy.get('h2.work').contains('DataCite Consortium');
      cy.get('a#account_menu_link').should('contain', Cypress.env('consortium_admin_username').toUpperCase());

      cy.get('ul.nav-tabs li a').contains(/Info/i)
        .and('have.attr', 'href').and('include', '/providers/' +  consortium_id);
      cy.get('ul.nav-tabs li.active a').contains(/Settings/i)
        .and('have.attr', 'href').and('include', '/providers/' + consortium_id + '/settings');
      cy.get('ul.nav-tabs li a').contains(/Consortium Organizations/i)
        .and('have.attr', 'href').and('include', '/providers/' + consortium_id + '/organizations');
      cy.get('ul.nav-tabs li a').contains(/Contacts/i)
        .and('have.attr', 'href').and('include', '/providers/' + consortium_id + '/contacts');
      cy.get('ul.nav-tabs li a').contains(/Repositories/i)
        .and('have.attr', 'href').and('include', '/providers/' + consortium_id + '/repositories');
      cy.get('ul.nav-tabs li a').contains(/Prefixes/i)
        .and('have.attr', 'href').and('include', '/providers/' + consortium_id + '/prefixes');
      cy.get('ul.nav-tabs li a').contains(/DOIs/i)
        .and('have.attr', 'href').and('include', '/providers/' + consortium_id + '/dois');

      cy.get('.btn-toolbar').within(($btnToolbar) => {
        cy.get('.btn-group-vertical a#set-password-provider').contains(/Set\s*Password/i)
          .and('have.attr', 'href').and('include', '/providers/' + consortium_id + '/change');
        cy.get('.btn-group-vertical a#edit-provider').contains(/Update\s*Member/i)
          .and('have.attr', 'href').and('include', '/providers/' + consortium_id + '/edit');
      });

      cy.get('button.export-basic-metadata').should('not.exist');

      cy.get('.metadata').within(($metadata) => {
        cy.get('h5').contains(/Record\s*created/i);
        cy.get('h5').contains(/Record\s*last\s*modified/i);
      });

      cy.get('h3.member-results').contains('Organization Information');

      cy.get('h5').contains(/Member\s*ID/i).parent().parent('.panel').within((panel) => {
        cy.get('h5').contains(/Member\s*ID/i);
        cy.get('div.panel-body').contains(Cypress.env('consortium_admin_username').toUpperCase());
        cy.get('h5').contains(/ROR ID/i);
        cy.get('a').contains('https://ror.org').and('have.attr', 'href').and('include', 'https://ror.org');
        cy.get('h5').contains(/Tax\s*Status/i);
        cy.get('div.panel-body').contains(/Non-Profit/i);
        cy.get('h5').contains(/Organization\s*Name/i);
        cy.get('div.panel-body').contains(/DataCite\s*Consortium/i);
        cy.get('h5').contains(/System\s*Email/i);
        cy.get('a').contains('info@datacite.org').and('have.attr', 'href').and('include', 'mailto:info@datacite.org');
        cy.get('h5').contains(/Website/i);
        cy.get('a').contains('https://datacite.org').and('have.attr', 'href').and('include', 'https://datacite.org');
        cy.get('h5').contains(/Country/i);
        cy.get('div.panel-body').contains(/Germany/i);
        cy.get('h5').contains(/Organization\s*Type/i);
        cy.get('div.panel-body').contains(/Service\s*Provider/i);
        cy.get('h5').contains(/Focus\s*Area/i);
        cy.get('div.panel-body').contains(/General/i);
      });

      cy.get('h3.member-results').contains('Contact Information');

      const contact_name_regex = new RegExp(test_contact_given_name + "\\s*" + test_contact_family_name_prefix, "i")

      cy.get('h5').contains(/Voting\s*Representative/i).parent().parent('.panel').within((panel) => {
        cy.get('h5').contains(/Voting\s*Representative/i);
        cy.get('[cy-data="voting"] a').contains(contact_name_regex).and('have.attr', 'href').and('contain', 'mailto:' + test_contact_given_name + '.' + test_contact_family_name_prefix);
        cy.get('h5').contains(/Service\s*Contact/i);
        cy.get('[cy-data="service"] a').contains(contact_name_regex).and('have.attr', 'href').and('contain', 'mailto:' + test_contact_given_name + '.' + test_contact_family_name_prefix);
        cy.get('h5').contains(/Billing\s*Contact/i);
        cy.get('[cy-data="billing"] a').contains(contact_name_regex).and('have.attr', 'href').and('contain', 'mailto:' + test_contact_given_name + '.' + test_contact_family_name_prefix);
      });

      cy.get('h3.member-results').contains('Billing Information');
      cy.get('.icon-warning').contains(/Please provide this information./);

      // Create DOI button
      cy.get('.create-doi-button').should('not.exist');    
    });
  });
});