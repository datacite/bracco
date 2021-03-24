/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Consortium Admin: Contact', () => {
  beforeEach(() => {
    cy.setCookie('_consent', 'true');
    cy.setCookie('_fabrica', Cypress.env('consortium_admin_cookie'), {
      log: false
    });
  });

  it('search contacts', () => {
    cy.visit('/providers/dc/contacts');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/dc/contacts');
    });
    cy.waitUntil(function () {
      return cy.get('input[name="query"]').should('not.be.disabled');
    });
    cy.get('input[name="query"]')
      .type('Doe{enter}')
      .get('[data-test-contact]')
      .should('contain', 'Doe');

    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('Contacts');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    cy.get('a#add-contact').should('exist');
  });

  it('filter contacts', () => {
    cy.visit('/providers/dc/contacts');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/dc/contacts');
    });
    cy.get('a#role-name-service')
      .click()
      .get('[data-test-contact]')
      .should('contain', 'Doe');

    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('Contacts');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    cy.get('a#add-contact').should('exist');
  });

  it('visiting contacts for member', () => {
    cy.visit('/providers/dc/contacts');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/dc/contacts');
    });
    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('Contacts');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    cy.get('a#add-contact').contains('Add Contact');
  });

  // it('visiting specific contact', () => {
  //   cy.visit('/contacts/3dd8d037-638e-48d8-854e-b1c0261d7e39');
  //   cy.location().should((loc) => {
  //     expect(loc.pathname).to.eq(
  //       '/contacts/3dd8d037-638e-48d8-854e-b1c0261d7e39'
  //     );
  //   });
  //   cy.get('h2.work').contains('Martin Fenner');
  //   cy.get('h3.member-results').contains('Contact Information');

  //   cy.get('a#edit-contact').contains('Update Contact');
  //   cy.get('a#delete-contact').contains('Delete Contact');
  // });

  // it('update specific contact', () => {
  //   cy.visit('/contacts/3dd8d037-638e-48d8-854e-b1c0261d7e39/edit');
  //   cy.location().should((loc) => {
  //     expect(loc.pathname).to.eq(
  //       '/contacts/3dd8d037-638e-48d8-854e-b1c0261d7e39/edit'
  //     );
  //   });
  //   cy.get('h2.work').contains('Martin Fenner');
  //   cy.get('h3.edit').contains('Update Contact');

  //   cy.get('input#givenName-field').should('exist');
  //   cy.get('input#familyName-field').should('exist');
  //   cy.get('input#email-field').should('exist');

  //   cy.get('.alert-warning').contains(
  //     'The contact may receive notifications about administration'
  //   );
  //   cy.get('button#update-contact').contains('Update Contact');
  // });

  // it('delete specific contact', () => {
  //   cy.visit('/contacts/3dd8d037-638e-48d8-854e-b1c0261d7e39/delete');
  //   cy.location().should((loc) => {
  //     expect(loc.pathname).to.eq(
  //       '/contacts/3dd8d037-638e-48d8-854e-b1c0261d7e39/delete'
  //     );
  //   });
  //   cy.get('h2.work').contains('Martin Fenner');
  //   cy.get('label.control-label').contains(
  //     'Are you sure you want to delete this contact? This action cannot be undone.'
  //   );

  //   cy.get('input#confirm-delete-field').should('exist');

  //   cy.get('button#delete').contains('Delete');
  // });

  it('show member settings', () => {
    cy.visit('/providers/dc');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/dc');
    });

    cy.get('h2.work').contains('DataCite');
    cy.get('h3.member-results').contains('Contact Information');
    cy.get('[cy-data="service"]').should('exist');
  });

  it('edit member settings', () => {
    cy.visit('/providers/dc/edit');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/dc/edit');
    });

    cy.get('h2.work').contains('DataCite');
    cy.get('h3.edit').contains('Update Member');
    cy.get('h3.member-results').contains('Contact Information');
    cy.get('div#service-contact').should('exist');
  });

  it('show repositories', () => {
    cy.visit('/providers/dc/repositories');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/dc/repositories');
    });

    cy.get('h2.work').contains('DataCite');
    cy.get('h3.member-results').contains('Repositories');
    cy.get('[cy-data="alert"]').contains('New repositories can\'t be created from this page.');
  });

  it('show repositories for consortium organization', () => {
    cy.visit('/providers/datacite/repositories');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/datacite/repositories');
    });

    cy.get('h2.work').contains('DataCite');
    cy.get('h3.member-results').contains('Repositories');
    cy.get('#add-repository').should('exist');
  });

  it('show repositories for consortium organization with missing contacts', () => {
    cy.visit('/providers/mgxi/repositories');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/mgxi/repositories');
    });

    cy.get('h2.work').contains('ETH Zurich');
    cy.get('h3.work').contains('Atlas of Innovations');
    cy.get('#add-repository').should('not.exist');
    cy.get('[cy-data="alert"]').contains('New repositories can\'t be created unless all required contacts are assigned.');
  });
});
