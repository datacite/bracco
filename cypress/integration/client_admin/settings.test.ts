/// <reference types="cypress" />
/* eslint-disable no-undef */

function escapeRE(string) {
  //return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

describe('ACCEPTANCE: CLIENT_ADMIN | SETTINGS', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;

  before(function () {
    cy.login(Cypress.env('client_admin_username'), Cypress.env('client_admin_password'));
    cy.setCookie('_consent', 'true');
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_fabrica', '_jwt', '_consent');
    cy.wait(waitTime2);
  });

  it('is logged in to homepage', () => {
    cy.visit('/');
    cy.url().should('include', '/repositories/datacite.test').then (() => {
      cy.get('h2.work').contains('DataCite Test Repository');
      cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');

      cy.get('ul.nav-tabs li a').contains(/Info/i)
        .and('have.attr', 'href').and('include', '/repositories/datacite.test/info');
      cy.get('ul.nav-tabs li.active a').contains(/Settings/i)
        .and('have.attr', 'href').and('include', '/repositories/datacite.test');
      cy.get('ul.nav-tabs li a').contains(/Prefixes/i)
        .and('have.attr', 'href').and('include', '/repositories/datacite.test/prefixes');
      cy.get('ul.nav-tabs li a').contains(/DOIs/i)
        .and('have.attr', 'href').and('include', '/repositories/datacite.test/dois');


      cy.get('.btn-toolbar').within(($btnToolbar) => {
        cy.get('.btn-group-vertical a#set-password-repository').contains(/Set\s*Password/i)
          .and('have.attr', 'href').and('include', '/repositories/datacite.test/change');
        cy.get('.btn-group-vertical a#edit-repository').contains(/Update\s*Repository/i)
          .and('have.attr', 'href').and('include', '/repositories/datacite.test/edit');
      })

      cy.get('.metadata').within(($metadata) => {
        cy.get('h5').contains(/Record\s*created/i);
        cy.get('h5').contains(/Record\s*last\s*modified/i);
      })

      cy.get('h5').contains(/Repository\s*ID/i);
      cy.get('div.panel-body').contains(/DATACITE.TEST/i);
      cy.get('h5').contains(/Description/i);
      cy.get('#description').contains(/datacite741/i);
      cy.get('h5').contains(/System\s*Email/i);
      cy.get('a').contains('mfenner@datacite.org').and('have.attr', 'href').and('include', 'mailto:mfenner@datacite.org');
      cy.get('h5').contains(/Domain/i);
    });
  });

  it('/info redirects to homepage', () => {
    cy.visit('/info');
    cy.url().should('include', '/repositories/datacite.test').then (() => {
      cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');
    });
  });

  it('/prefixes redirects to homepage', () => {
    cy.visit('/prefixes');
    cy.url().should('include', '/repositories/datacite.test').then (() => {
      cy.get('h2.work').contains('DataCite Test Repository');
      cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');
    });
  });

  it('/dois redirects to homepage', () => {
    cy.visit('/dois');
    cy.url().should('include', '/repositories/datacite.test').then (() => {
      cy.get('h2.work').contains('DataCite Test Repository');
      cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');
    });
  });

  it('has password settings page', () => {
    cy.visit('/repositories/datacite.test/change');
    cy.url().should('include', '/repositories/datacite.test/change').then (() => {

      cy.get('h2.work').contains('DataCite Test Repository');
      cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');

      cy.get('h3').contains(/Set Password/i);

      cy.get('form').within(($form) => {
        cy.get('input#password-input-field').should('be.visible');
        cy.get('input#confirm-password-input-field').should('be.visible');
        cy.get('button[type=submit]').should('be.visible');
      });
    }).then (() => {
      cy.get('button#cancel').should('be.visible').click({force: true}).then (() => {
        cy.url().should('match', (new RegExp(escapeRE('/repositories/datacite.test') + '$')));
      });
    });
  });

  // TBD - Could do more testing here. Only cursory testing for
  // presence of field objects. No testing of form behavior yet.
  it('has repository settings page', () => {
    cy.visit('/repositories/datacite.test/edit');
    cy.url().should('include', '/repositories/datacite.test/edit').then(() => {

      cy.get('h2.work').contains('DataCite Test Repository');
      cy.get('a#account_menu_link').should('contain', 'DATACITE.TEST');

      cy.get('form').within(($form) => {
        cy.get('#repository-id').should('be.visible');
        cy.get('#client-type').should('be.visible');
        cy.get('#re3data').should('be.visible');
        cy.get('#name').should('be.visible');
        cy.get('#name-field').should('be.visible');
        cy.get('#alternate-name').should('be.visible');
        cy.get('#system-email').should('be.visible');
        cy.get('#service-contact-given-name').should('be.visible');
        cy.get('#service-contact-family-name').should('be.visible');
        cy.get('#service-contact-email').should('be.visible');
        cy.get('#description').should('be.visible');
        cy.get('#url').should('be.visible');
        cy.get('#language').should('be.visible');
        cy.get('#software').should('be.visible');
        cy.get('#domains').should('be.visible');
        cy.get('#repository-type').should('be.visible');
        cy.get('#certificate').should('be.visible');
        cy.get('.alert.opt-in').contains(/The contacts entered may receive notifications/i)
          .within(() => {
            cy.get('a[href*="privacy.html"]').should('be.visible');
          }
        );
        cy.get('button#update-repository').should('be.visible');
      })
    }).then(() => {
      cy.get('button').contains(/Cancel/i).should('be.visible').click({force: true}).then (() => {
        cy.url().should('include', '/repositories/datacite.test');
      });
    });
  });
});
