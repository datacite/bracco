/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('ACCEPTANCE: ORGANIZATION_ADMIN | REPOSITORIES', () => {
    const waitTime = 1000;
    const waitTime2 = 2000;
    let prefix = '';
    let suffix = '';

    before(function () {
      cy.login(Cypress.env('organization_admin_username'), Cypress.env('organization_admin_password'));
      cy.setCookie('_consent', 'true');
    });

    beforeEach(() => {
      Cypress.Cookies.preserveOnce('_fabrica', '_jwt', '_consent');
      cy.wait(waitTime2);
    });

    after(function () {
      // cy.log('TBD - CLEAN UP RESOURCES AFTER TEST');
    });

    // Check for page elements.
    it('is logged in to repositories page', () => {
      cy.visit('/providers/datacite/repositories');
      cy.url().should('include', '/providers/datacite/repositories').then(() => {

        // Has upper right user profile link.
        cy.get('h2.work').contains('DataCite');
        cy.get('a#account_menu_link').should('contain', 'DATACITE');

        // Has tabs with correct one activated.
        cy.get('ul.nav-tabs li.active a').contains(/Repositories/i)
          .and('have.attr', 'href').and('include', '/providers/datacite/repositories');

        cy.get('.btn-toolbar').within(($btnToolbar) => {
          cy.get('.btn-group a#add-repository').contains(/Add\s*Repositor/i)
            .and('have.attr', 'href').and('include', '/providers/datacite/repositories/new');
        });

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
      });
    });

  // TBD - Could do more testing here. Only cursory testing for
  // presence of field objects. No testing of form behavior yet.
  it.only('has an add repository page', () => {
    cy.visit('/providers/datacite/repositories/new');
    cy.url().should('include', '/providers/datacite/repositories/new').then(() => {

      cy.get('h2.work').contains('DataCite');
      cy.get('a#account_menu_link').should('contain', 'DATACITE');

      cy.get('h3.edit').contains(/Add\s*Repository/);

      cy.get('form').within(($form) => {
        cy.get('#repository-id').should('be.visible');
        cy.get('#client-type').should('be.visible');
        cy.get('#re3data').should('be.visible');
        cy.get('#name').should('be.visible');
        cy.get('#alternate-name').should('be.visible');
        cy.get('#system-email').should('be.visible');
        cy.get('.form-group')
          .within(($form_group) => {
            cy.get('label').contains(/Service Contact/);
            cy.get('input#service-contact-given-name').should('be.visible');
            cy.get('input#service-contact-family-name').should('be.visible');
            cy.get('input#service-contact-email').should('be.visible');
          }
        );
        cy.get('#description').should('be.visible')
        cy.get('#url').should('be.visible');
        cy.get('#language')
          .within(($form_group) => {
            // test for lamguage
            cy.get('button.add-language').should('be.visible');
          }
        );
        cy.get('#software').should('be.visible');
        cy.get('#domains').should('be.visible');
        cy.get('#repository-type')
          .within(($form_group) => {
            // test for lamguage
            cy.get('button.add-repositoryType').should('be.visible');
          }
        );
        cy.get('#certificate')
          .within(($form_group) => {
            // test for lamguage
            cy.get('button.add-certificate').should('be.visible');
          }
        );
        cy.get('#is-active')
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
        cy.get('.alert.alert-danger').contains(/To save this repository, first resolve the errors with these fields: repository name, system email./i )

        cy.get('button#add-repository').should('be.visible');
      });
    });
    /*
    .then(() => {
      cy.get('button').contains(/Cancel/i).should('be.visible').click({force: true}).then(() => {
        cy.wait(waitTime);
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/providers/datacite/repositories');
        });
      });
    });
    */
  });
});
