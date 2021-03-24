/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Admin: Prefix', () => {
  beforeEach(() => {
    cy.setCookie('_consent', 'true');
    cy.setCookie('_fabrica', Cypress.env('staff_admin_cookie'), { log: false });
  });

  it('search prefixes', () => {
    cy.visit('/prefixes');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/prefixes');
    });
    cy.get('input[name="query"]')
      .type('10.5438{enter}')
      .get('[data-test-prefix]')
      .should('contain', '10.5438');

    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('Prefixes');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    cy.get('a#add-prefixes').contains('Add Prefixes');
  });

  it('filter prefixes', () => {
    cy.visit('/prefixes');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/prefixes');
    });
    cy.get('a#prefix-with-repository')
      .click()
      .get('h3.member-results')
      .should('contain', 'Prefixes');

    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('Prefixes');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    cy.get('a#add-prefixes').contains('Add Prefixes');
  });

  it('visiting prefixes for member', () => {
    cy.visit('/providers/datacite/prefixes');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/datacite/prefixes');
    });
    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('Prefixes');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    cy.get('a#assign-prefix').contains('Assign Prefix');
  });

  it('visiting specific prefix for member', () => {
    cy.visit('/providers/datacite/prefixes/10.5438');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/datacite/prefixes/10.5438');
    });
    cy.get('[cy-data="prefix"]').contains('10.5438');
    cy.get('[cy-data="datacite.datacite"]', { timeout: 30000 }).contains(
      'DataCite Repository'
    );
  });

  it('update specific contact', () => {
    cy.visit('/contacts/44e763d0-87c3-4f00-a3ea-316f9c0c47cc/edit');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(
        '/contacts/44e763d0-87c3-4f00-a3ea-316f9c0c47cc/edit'
      );
    });
    cy.get('h2.work').contains('John Howard');
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
    cy.visit('/contacts/44e763d0-87c3-4f00-a3ea-316f9c0c47cc/delete');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(
        '/contacts/44e763d0-87c3-4f00-a3ea-316f9c0c47cc/delete'
      );
    });
    cy.get('h2.work').contains('John Howard');
    cy.get('label.control-label').contains(
      'Are you sure you want to delete this contact? This action cannot be undone.'
    );

    cy.get('input#confirm-name-field').should('exist');

    cy.get('button#delete').contains('Delete');
  });

  it('show member settings', () => {
    cy.visit('/providers/issda');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/issda');
    });

    cy.get('h2.work').contains('Irish Social Science Data Archive (ISSDA)');
    cy.get('h3.member-results').contains('Contact Information');
    cy.get('[cy-data="service"]').contains('John Howard');
  });

  it('edit member settings', () => {
    cy.visit('/providers/issda/edit');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/issda/edit');
    });

    cy.get('h2.work').contains('Irish Social Science Data Archive (ISSDA)');
    cy.get('h3.edit').contains('Update Organization');
    cy.get('h3.member-results').contains('Contact Information');
    cy.get('div#service-contact').contains('John Howard');
  });
});
