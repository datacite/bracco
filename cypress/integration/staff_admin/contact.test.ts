// /// <reference types="cypress" />
// /* eslint-disable no-undef */

// describe('Admin: Contact', () => {
//   beforeEach(() => {
//     cy.setCookie('_consent', 'true');
//     cy.setCookie('_fabrica', Cypress.env('staff_admin_cookie'), { log: false });
//   });

//   it('search contacts', () => {
//     cy.visit('/contacts');
//     cy.location().should((loc) => {
//       expect(loc.pathname).to.eq('/contacts');
//     });
//     cy.waitUntil(function () {
//       return cy.get('input[name="query"]').should('not.be.disabled');
//     });
//     cy.get('input[name="query"]')
//       .type('Howard{enter}')
//       .get('[data-test-contact]')
//       .should('contain', 'Howard');

//     cy.get('h2.work').contains('DataCite');
//     cy.get('li a.nav-link.active').contains('Contacts');
//     cy.get('div#search').should('exist');
//     cy.get('div.panel.facets').should('exist');

//     cy.get('a#add-contact').should('not.exist');
//   });

//   it('filter contacts', () => {
//     cy.visit('/contacts');
//     cy.location().should((loc) => {
//       expect(loc.pathname).to.eq('/contacts');
//     });
//     cy.get('a#role-name-service')
//       .click()
//       .get('h3.member-results')
//       .should('contain', 'Contacts');

//     cy.get('h2.work').contains('DataCite');
//     cy.get('li a.nav-link.active').contains('Contacts');
//     cy.get('div#search').should('exist');
//     cy.get('div.panel.facets').should('exist');

//     cy.get('a#add-contact').should('not.exist');
//   });

//   it('visiting contacts for member', () => {
//     cy.visit('/providers/issda/contacts');
//     cy.location().should((loc) => {
//       expect(loc.pathname).to.eq('/providers/issda/contacts');
//     });
//     cy.get('h2.work').contains('Irish Social Science Data Archive (ISSDA)');
//     cy.get('li a.nav-link.active').contains('Contacts');
//     cy.get('div#search').should('exist');
//     cy.get('div.panel.facets').should('exist');

//     cy.get('a#add-contact').contains('Add Contact');
//   });

//   it('visiting specific contact', () => {
//     cy.visit('/contacts/44e763d0-87c3-4f00-a3ea-316f9c0c47cc');
//     cy.location().should((loc) => {
//       expect(loc.pathname).to.eq(
//         '/contacts/44e763d0-87c3-4f00-a3ea-316f9c0c47cc'
//       );
//     });
//     cy.get('h2.work').contains('John Howard');
//     cy.get('h3.member-results').contains('Contact Information');

//     cy.get('a#edit-contact').contains('Update Contact');
//     cy.get('a#delete-contact').contains('Delete Contact');
//   });

//   it('update specific contact', () => {
//     cy.visit('/contacts/44e763d0-87c3-4f00-a3ea-316f9c0c47cc/edit');
//     cy.location().should((loc) => {
//       expect(loc.pathname).to.eq(
//         '/contacts/44e763d0-87c3-4f00-a3ea-316f9c0c47cc/edit'
//       );
//     });
//     cy.get('h2.work').contains('John Howard');
//     cy.get('h3.edit').contains('Update Contact');

//     cy.get('input#givenName-field').should('exist');
//     cy.get('input#familyName-field').should('exist');
//     cy.get('input#email-field').should('exist');

//     cy.get('.alert-warning').contains(
//       'The contact may receive notifications about administration'
//     );
//     cy.get('button#update-contact').contains('Update Contact');
//   });

//   it('delete specific contact', () => {
//     cy.visit('/contacts/44e763d0-87c3-4f00-a3ea-316f9c0c47cc/delete');
//     cy.location().should((loc) => {
//       expect(loc.pathname).to.eq(
//         '/contacts/44e763d0-87c3-4f00-a3ea-316f9c0c47cc/delete'
//       );
//     });
//     cy.get('h2.work').contains('John Howard');
//     cy.get('label.control-label').contains(
//       'Are you sure you want to delete this contact? This action cannot be undone.'
//     );

//     cy.get('input#confirm-delete-field').should('exist');

//     cy.get('button#delete').contains('Delete');
//   });

//   // it('show member settings', () => {
//   //   cy.visit('/providers/issda');
//   //   cy.location().should((loc) => {
//   //     expect(loc.pathname).to.eq('/providers/issda');
//   //   });

//   //   cy.get('h2.work').contains('Irish Social Science Data Archive (ISSDA)');
//   //   cy.get('h3.member-results').contains('Contact Information');
//   //   cy.get('[cy-data="service"]').contains('John Howard');
//   // });

//   // it('edit member settings', () => {
//   //   cy.visit('/providers/issda/edit');
//   //   cy.location().should((loc) => {
//   //     expect(loc.pathname).to.eq('/providers/issda/edit');
//   //   });

//   //   cy.get('h2.work').contains('Irish Social Science Data Archive (ISSDA)');
//   //   cy.get('h3.edit').contains('Update Organization');
//   //   cy.get('h3.member-results').contains('Contact Information');
//   //   cy.get('div#service-contact').contains('John Howard');
//   // });
// });
