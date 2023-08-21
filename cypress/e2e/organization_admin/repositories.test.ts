/// <reference types="cypress" />
/* eslint-disable no-undef */

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

describe('ACCEPTANCE: ORGANIZATION_ADMIN | REPOSITORIES', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;
  const waitTime3 = 3000;
  let prefix = '';
  let suffix = '';
  const min = 500000;
  const max = 999999;
  const provider_id = Cypress.env('organization_admin_username').toLowerCase()
  const test_contact_family_name_prefix = "OrganizationAdmin"

  before(function () {
    var rndInt = randomIntFromInterval(min, max);
    var given_name = 'Jack';
    var family_name = test_contact_family_name_prefix + rndInt;
    var email = given_name + '.' + family_name + '@example.org';
    var type = 'providers';
    var roles = ["service", "secondary_service", "technical", "secondary_technical", "billing"];

    cy.login(Cypress.env('organization_admin_username'), Cypress.env('organization_admin_password'));
    cy.setCookie('_consent', 'true');

    cy.wait(waitTime2);

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, provider_id, Cypress.env('api_url'), cookie.value)
    })
  });

  beforeEach(() => {
    // Move login to before function.
  });

  after(() => {
    cy.getCookie('_jwt').then((cookie) => {
      cy.deleteProviderTestContacts(provider_id, test_contact_family_name_prefix, Cypress.env('api_url'), cookie.value)
    })
  })

  // Check for page elements.
  it('is logged in to repositories page', () => {
    cy.visit('/providers/' + provider_id + '/repositories');
    cy.url().should('include', '/providers/' + provider_id + '/repositories').then(() => {

      // Has Fabrica logo and correct navbar color
      cy.get('img.fabrica-logo').should('exist').should('have.attr', 'src').should('include', 'fabrica-logo.svg');
      cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(0, 177, 226)');

      // Has upper right user profile link.
      cy.get('h2.work').contains('DataCite');
      cy.get('a#account_menu_link').should('contain', Cypress.env('organization_admin_username').toUpperCase());

      // Has tabs with correct one activated.
      cy.get('ul.nav-tabs li.active a').contains(/Repositories/i)
        .and('have.attr', 'href').and('include', '/providers/' + provider_id + '/repositories');

      cy.get('.btn-toolbar').within(($btnToolbar) => {
        cy.get('.btn-group a#add-repository').contains(/Add\s*Repositor/i)
          .and('have.attr', 'href').and('include', '/providers/' + provider_id + '/repositories/new');
      });

      cy.get('button.export-basic-metadata').should('not.exist');

      // Has left sidebar facets.
      cy.get('.facets h4').contains(/Year\s*joined/i);
      cy.get('.facets h4').contains(/Type/i);
      cy.get('.facets h4').contains(/Repository\s*Type/);
      cy.get('.facets h4').contains(/Certificate/i);
      cy.get('.facets h4').contains(/Software/i);

      // Has search form.
      cy.get('form #search').within(($searchBar) => {
        cy.get('input[name="query"]')
          .and('have.attr', 'placeholder').should('match', /Type\s*to\s*search.../i);
        cy.get('button').contains(/Search/i);
      });

      // Repository total.
      cy.get('[data-test-results]').contains(/Repositories/i);

      // Sort.
      cy.get('#sort select').contains(/Sort by Name/i);
      cy.get('#sort select').contains(/Sort by Date Joined/i);
      cy.get('#sort select').contains(/Sort by Relevance/i);

      // Has search results as content.
      cy.get('#content').within(($content) => {
        cy.get('[data-test-repository]').its('length').should('be.gte', 1);
      });

      // Create DOI button
      cy.get('.create-doi-button').should('not.exist');
    });
  });

  // TBD - Could do more testing here. Only cursory testing for
  // presence of field objects. No testing of form behavior yet.
  it('has an add repository page', () => {
    cy.visit('/providers/' + provider_id + '/repositories/new');
    cy.url().should('include', '/providers/' + provider_id + '/repositories/new').then(() => {

      cy.wait(waitTime2);
      cy.get('h2.work').contains('DataCite');
      cy.get('a#account_menu_link').should('contain', Cypress.env('organization_admin_username').toUpperCase());

      cy.get('h3.edit').contains(/Add\s*Repository/);

      cy.get('#repository-id').should('be.visible');
      cy.get('#client-type').should('be.visible');
      cy.get('#client-type .ember-power-select-selected-item').should('contain', 'Repository');

      // Set client_type to Periodical
      cy.get('div#client-type div[role="button"]').click({ waitForAnimations: true }).then(() => {
        cy.get('ul.ember-power-select-options li').contains('Periodical').click({ waitForAnimations: true }).then(() => {
          // Periodical client_type divs should be visible and Repository client_type divs should not exist
          cy.get('#repository-issn').should('be.visible');
          cy.get('#repository-type').should('not.exist');
          cy.get('#certificate').should('not.exist');   
        })
      });

      cy.wait(waitTime);

      // Set client_type to IGSN ID Catalog
      cy.get('div#client-type div[role="button"]').click({ waitForAnimations: true }).then(() => {
        cy.get('ul.ember-power-select-options li').contains('IGSN ID Catalog').click({ waitForAnimations: true }).then(() => {
          // IGSN ID Catalog client_type divs should be visible
          cy.get('.help-block').should('contain', 'This repository will only be able to mint IGSN IDs.');          
          cy.get('#repository-issn').should('not.exist');
          cy.get('#repository-type').should('be.visible');
          cy.get('#certificate').should('be.visible');   
        })
      });

      cy.wait(waitTime3);

      // Set client_type back to Repository
      cy.get('div#client-type div[role="button"]').click({ waitForAnimations: true }).then(() => {
        cy.get('ul.ember-power-select-options li').contains('Repository').click({ waitForAnimations: true })
      });
      cy.get('#client-type .ember-power-select-selected-item').should('contain', 'Repository');

      cy.get('#re3data').should('be.visible');
      cy.get('#name').should('be.visible');
      cy.get('#alternate-name').should('be.visible');
      cy.get('#system-email').should('be.visible');
      cy.get('#service-contact.form-group')
        .within(($form_group) => {
          cy.get('label').contains(/Service Contact/);
          cy.get('input#service-contact-given-name').should('be.visible');
          cy.get('input#service-contact-family-name').should('be.visible');
          cy.get('input#service-contact-email').should('be.visible');
        }
      );
      cy.get('#description').should('be.visible')
      cy.get('#url').should('be.visible');
      cy.get('#language.form-group')
        .within(($form_group) => {
          // test for lamguage
          cy.get('button.add-language').should('be.visible');
        }
      );
      cy.get('#software').should('be.visible');
      cy.get('#domains').should('be.visible');
      cy.get('#repository-type.form-group')
        .within(($form_group) => {
          // test for lamguage
          cy.get('button.add-repositoryType').should('be.visible');
        }
      );
      cy.get('#certificate.form-group')
        .within(($form_group) => {
          // test for lamguage
          cy.get('button.add-certificate').should('be.visible');
        }
      );
      cy.get('#is-active.form-group')
        .within(($form_group) => {
          // test for lamguage
          cy.get('input[type="checkbox"]#is-active-field').should('be.visible');
        }
      );

      cy.get('.alert').contains(/The contacts entered may receive notifications/i)
        .within(() => {
          cy.get('a[href*="privacy.html"]').should('be.visible');
        }
      );
      cy.get('.alert').contains(/To save this repository, first resolve the errors with these fields:/i)
      cy.get('.alert').contains(/repository name, system email./i)

      cy.get('button#add-repository').should('be.visible');
      cy.get('button').contains(/Cancel/i).should('be.visible')  
      })
  });

  // ASSUMING DATACITE.TEST EXISTS:
  it('check repositories tabs for required components - assumes datacite.test exists', () => {
    cy.visit('/repositories/datacite.test');
    cy.wait(waitTime2);

    // Create DOI button
    cy.get('.create-doi-button').should('not.exist');

    cy.visit('/repositories/datacite.test/info');
    cy.wait(waitTime2);

    // Create DOI button
    cy.get('.create-doi-button').should('not.exist');

    cy.visit('/repositories/datacite.test/prefixes');
    cy.wait(waitTime2);

    // Create DOI button
    cy.get('.create-doi-button').should('not.exist');

    cy.visit('/repositories/datacite.test/dois');
    cy.wait(waitTime2);

    // Create DOI button
    cy.get('.create-doi-button').should('not.exist');
  });
});
