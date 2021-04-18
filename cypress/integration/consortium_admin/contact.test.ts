/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('Acceptance: consortium_admin | contacts', () => {
  const waitTimeBetIt = 1000;
  const waitTime = 1000;
  const waitTime1 = 1000;

  beforeEach(() => {
    cy.setCookie('_consent', 'true');
    cy.setCookie('_fabrica', Cypress.env('consortium_admin_cookie'), { log: false });
    cy.wait(waitTimeBetIt);
  });

  it('visiting contacts for member', () => {
    cy.visit('/providers/dc/contacts');
    cy.url().should('include', '/providers/dc/contacts')
    cy.wait(waitTime);
    
    cy.get('h2.work').contains('DataCite Consortium');
    cy.get('li a.nav-link.active').contains('Contacts');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    cy.get('a#add-contact').contains('Add Contact');
  });

  it('search contacts', () => {
    cy.visit('/providers/dc/contacts');
    cy.url().should('include', '/providers/dc/contacts')
    cy.wait(waitTime);

    cy.get('input[name="query"]')
      .type('Doe{enter}', { force: true } )
      .get('[data-test-contact]')
      .should('contain', 'Doe');
  });

  // TO DO: more filter tests?
  it('filter contacts', () => {
    cy.visit('/providers/dc/contacts');
    cy.url().should('include', '/providers/dc/contacts')
    cy.wait(waitTime);
    
    cy.get('a#role-name-service')
      .click()
      .get('[data-test-contact]')
      .should('contain', 'Doe');
  });

  // The following 3 tests should work.  (view/edit/delete)
  // TO DO: Commenting it out waiting for a bug fix.
  // it('visiting specific contact', () => {
  //   cy.visit('/contacts/93109080-a0de-49a8-a6ce-120cb4a3ccb0');
  //   cy.url().should('include', '/contacts/93109080-a0de-49a8-a6ce-120cb4a3ccb0')
  //   cy.wait(waitTime);

  //   cy.get('h2.work').contains('Martin Fenner');
  //   cy.get('h3.member-results').contains('Contact Information');

  //   cy.get('a#edit-contact').contains('Update Contact');
  //   cy.get('a#delete-contact').contains('Delete Contact');
  // });

  // it('update specific contact', () => {
  //   cy.visit('/contacts/93109080-a0de-49a8-a6ce-120cb4a3ccb0/edit');
  //   cy.url().should('include', '/contacts/93109080-a0de-49a8-a6ce-120cb4a3ccb0/edit')
  //   cy.wait(waitTime);

  //   cy.get('h2.work').contains('John Doe');
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
  //   cy.visit('/contacts/93109080-a0de-49a8-a6ce-120cb4a3ccb0/delete');
  //   cy.url().should('include', '/contacts/93109080-a0de-49a8-a6ce-120cb4a3ccb0/delete')
  //   cy.wait(waitTime);
  
  //   cy.get('h2.work').contains('John Doe');
  //   cy.get('label.control-label').contains(
  //     'Are you sure you want to delete this contact? This action cannot be undone.'
  //   );

  //   cy.get('input#confirm-delete-field').should('exist');
  //   cy.get('button#delete').contains('Delete');
  // });

  it('show repositories for consortium organization with missing contacts', () => {
    cy.visit('/providers/mgxi/repositories');
    cy.url().should('include', '/providers/mgxi/repositories')
    cy.wait(waitTime);

    cy.get('h2.work').contains('ETH Zurich');
    cy.get('h3.work').contains('Atlas of Innovations');
    cy.get('#add-repository').should('exist');
  });
});
