/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Admin: Admin', () => {
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

  it('is logged in', () => {
    cy.visit('/');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('a#account_menu_link').contains('ADMIN');
  });

  it('editing admin form', () => {
    cy.visit('/edit');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/edit');
    });
    cy.get('input#member-id-field').should('exist');
    cy.get('input#system-email-field').should('exist');
    cy.get('input#website-field').should('exist');
    cy.get('input#twitter-handle-field').should('exist');
    cy.get('div#ror-id').should('exist');
    cy.get('div#country').should('exist');
    cy.get('textarea#description-field').should('exist');

    cy.get('button#update-provider').contains('Update Account');
  });

  it('editing admin password form', () => {
    cy.visit('/change');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/change');
    });
    cy.get('input#password-input-field').should('exist');
    cy.get('input#confirm-password-input-field').should('exist');

    cy.get('button[type=submit]').contains('Set Password');
  });

  it('visiting homepage', () => {
    cy.visit('/');
    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('Info');
    cy.get('button.export-basic-metadata').should('not.exist');
  });

  it('visiting settings', () => {
    cy.visit('/settings');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/settings');
    });
    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('Settings');
    cy.get('button.export-basic-metadata').should('not.exist');
  });

  it('visiting members', () => {
    cy.visit('/providers');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers');
    });
    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('Members');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');
    cy.get('button.export-basic-metadata').should('not.exist');

    cy.get('a#add-provider').contains('Add Member');
  });

  it('visiting repositories', () => {
    cy.visit('/repositories');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/repositories');
    });
    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('Repositories');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');
    cy.get('button.export-basic-metadata').should('not.exist');

    // staff can't add repositories here (needs to go to provider first)
    cy.get('a#add-repository').should('not.exist');
  });

  it('visiting contacts', () => {
    cy.visit('/contacts');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/contacts');
    });
    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('Contacts');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');
    cy.get('button.export-basic-metadata').should('not.exist');

    // staff can't add contacts here (needs to go to provider first)
    cy.get('a#add-contact').should('not.exist');
  });

  it('visiting prefixes', () => {
    cy.visit('/prefixes');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/prefixes');
    });
    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('Prefixes');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');
    cy.get('button.export-basic-metadata').should('not.exist');

    cy.get('a#add-prefixes').contains('Add Prefixes');
  });

  it('visiting prefix 10.80225', () => {
    cy.visit('/prefixes/10.80225');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/prefixes/10.80225');
    });
    cy.get('div.alert-warning').contains('The page was not found.');
  });

  it('visiting dois', () => {
    cy.visit('/dois');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/dois');
    });
    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('DOIs');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');
    cy.get('button.export-basic-metadata').should('not.exist');

    // staff can't add doi here (needs to go to repository first)
    cy.get('a#add-doi').should('not.exist');
  });
});
