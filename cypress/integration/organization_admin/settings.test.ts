/// <reference types="cypress" />
/* eslint-disable no-undef */

function escapeRE(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

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

  it('is logged in to homepage', () => {
    cy.visit('/providers/datacite');
    cy.url().should('include', '/providers/datacite').then (() => {
      cy.get('h2.work').contains('DataCite');
      cy.get('a#account_menu_link').should('contain', 'DATACITE');

      cy.get('ul.nav-tabs li a').contains(/Info/i)
        .and('have.attr', 'href').and('include', '/providers/datacite/info');
      cy.get('ul.nav-tabs li.active a').contains(/Settings/i)
        .and('have.attr', 'href').and('include', '/providers/datacite');
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

  it('/info redirects to homepage', () => {
    cy.visit('/info');
    cy.url().should('include', '/providers/datacite').then (() => {
      cy.get('a#account_menu_link').should('contain', 'DATACITE');
    });
  });

  it('/contacts redirects to homepage', () => {
    cy.visit('/contacts');
    cy.url().should('include', '/providers/datacite').then (() => {
      cy.get('a#account_menu_link').should('contain', 'DATACITE');
    });
  });

  it('/repositories redirects to homepage', () => {
    cy.visit('/repositories');
    cy.url().should('include', '/providers/datacite').then (() => {
      cy.get('a#account_menu_link').should('contain', 'DATACITE');
    });
  });

  it('/prefixes redirects to homepage', () => {
    cy.visit('/prefixes');
    cy.url().should('include', '/providers/datacite').then (() => {
      cy.get('a#account_menu_link').should('contain', 'DATACITE');
    });
  });

  it('/dois redirects to homepage', () => {
    cy.visit('/dois');
    cy.url().should('include', '/providers/datacite').then (() => {
      cy.get('a#account_menu_link').should('contain', 'DATACITE');
    });
  });

  it('has password settings page', () => {
    cy.visit('/providers/datacite/change');
    cy.url().should('include', '/providers/datacite/change').then (() => {

      cy.get('h2.work').contains('DataCite');
      cy.get('a#account_menu_link').should('contain', 'DATACITE');

      cy.get('h3').contains(/Set Password/i);

      cy.get('form').within(($form) => {
        cy.get('input#password-input-field').should('be.visible');
        cy.get('input#confirm-password-input-field').should('be.visible');
        cy.get('button[type=submit]').should('be.visible');
        cy.get('button').contains(/Cancel/i).should('be.visible')

        cy.get('button').contains(/Cancel/i).click({force: true});
      });
    })

    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("/providers/datacite");
    });
  });

  // TBD - Could do more testing here. Only cursory testing for
  // presence of field objects. No testing of form behavior yet.
  it('has an organization settings page', () => {
    cy.visit('/providers/datacite/edit');
    cy.url().should('include', '/providers/datacite/edit').then(() => {

      cy.get('h2.work').contains('DataCite');
      cy.get('a#account_menu_link').should('contain', 'DATACITE');

      cy.get('h3.edit').contains(/Update\s*Organization/);

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
        cy.get('#country').should('be.visible');
        cy.get('#organization-type').should('be.visible');
        cy.get('#focus-area').should('be.visible');
        cy.get('#description').should('be.visible');

        cy.get('h3.member-results').contains('Contact Information');
        cy.get('.alert-info').contains(/Contacts are created.*and then assigned roles here./i )
        cy.get('#service-contact').should('be.visible');
        cy.get('#secondary-service-contact').should('be.visible');
        cy.get('#technical-contact').should('be.visible');
        cy.get('#secondary-technical-contact').should('be.visible');
        cy.get('.alert-warning').contains(/The contacts entered may receive notifications/i)
          .within(() => {
            cy.get('a[href*="privacy.html"]').should('be.visible');
          }
        );
        cy.get('button#update-provider').should('be.visible');
        cy.get('button').contains(/Cancel/i).should('be.visible');

        cy.get('button').contains(/Cancel/i).click({force: true});
      })
    });

    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("/providers/datacite");
    });
  });
});