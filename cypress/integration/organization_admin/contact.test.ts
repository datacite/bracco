/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Organization Admin: Contact', () => {
  beforeEach(() => {
    cy.setCookie('_consent', 'true');
    cy.setCookie('_fabrica', Cypress.env('organization_admin_cookie'), {
      log: false
    });
  });

  it('search contacts', () => {
    cy.visit('/providers/datacite/contacts');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/datacite/contacts');
    });
    cy.waitUntil(function () {
      return cy.get('input[name="query"]').should('not.be.disabled');
    });
    cy.get('input[name="query"]')
      .type('Vierkant{enter}')
      .get('[data-test-contact]')
      .should('contain', 'Vierkant');

    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('Contacts');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    cy.get('a#add-contact').should('exist');
  });

  it('filter contacts', () => {
    cy.visit('/providers/datacite/contacts');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/datacite/contacts');
    });
    cy.get('a#role-name-service')
      .click()
      .get('[data-test-contact]')
      .should('contain', 'Vierkant');

    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('Contacts');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    cy.get('a#add-contact').should('exist');
  });

  it('visiting contacts for member', () => {
    cy.visit('/providers/datacite/contacts');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/datacite/contacts');
    });
    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('Contacts');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    cy.get('a#add-contact').contains('Add Contact');
  });

  it('visiting specific contact', () => {
    cy.visit('/contacts/1e49da41-8389-4f75-8fa2-0ed72544ad39');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(
        '/contacts/1e49da41-8389-4f75-8fa2-0ed72544ad39'
      );
    });
    cy.get('h2.work').contains('Paul Vierkant');
    cy.get('h3.member-results').contains('Contact Information');

    cy.get('a#edit-contact').contains('Update Contact');
    // cy.get('a#delete-contact').contains('Delete Contact');
  });

  it('update specific contact', () => {
    cy.visit('/contacts/1e49da41-8389-4f75-8fa2-0ed72544ad39/edit');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(
        '/contacts/1e49da41-8389-4f75-8fa2-0ed72544ad39/edit'
      );
    });
    cy.get('h2.work').contains('Paul Vierkant');
    cy.get('h3.edit').contains('Update Contact');

    cy.get('input#givenName-field').should('exist');
    cy.get('input#familyName-field').should('exist');
    cy.get('input#email-field').should('exist');

    cy.get('.alert-warning').contains(
      'The contact may receive notifications about administration'
    );
    cy.get('button#update-contact').contains('Update Contact');
  });

  it('delete specific contact', () => {
    cy.visit('/contacts/1e49da41-8389-4f75-8fa2-0ed72544ad39/delete');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/datacite');
    });
    cy.get('h2.work').contains('DataCite');
    cy.get('h3.member-results').contains('Contact Information');
  });

  it('show member settings', () => {
    cy.visit('/providers/datacite');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/datacite');
    });

    cy.get('h2.work').contains('DataCite');
    cy.get('h3.member-results').contains('Contact Information');
    cy.get('[cy-data="service"]').should('exist');
  });

  it('edit member settings', () => {
    cy.visit('/providers/datacite/edit');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/datacite/edit');
    });

    cy.get('h2.work').contains('DataCite');
    cy.get('h3.edit').contains('Update Organization');
    cy.get('h3.member-results').contains('Contact Information');
    cy.get('div#service-contact').should('exist');
  });

  it('show repositories', () => {
    cy.visit('/providers/datacite/repositories');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/datacite/repositories');
    });

    cy.get('h2.work').contains('DataCite');
    cy.get('h3.member-results').contains('Repositories');
    cy.get('#add-repository').should('exist');
  });
});
