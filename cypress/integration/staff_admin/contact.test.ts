/// <reference types="cypress" />
/* eslint-disable no-undef */

function escapeRE(string) {
  //return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

describe('ACCEPTANCE: STAFF_ADMIN | CONTACTS', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;
  const waitTime3 = 3000;
  const waitTime4 = 4000;

  before(function () {
    cy.login(Cypress.env('staff_admin_username'), Cypress.env('staff_admin_password'));
    cy.setCookie('_consent', 'true');
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_fabrica', '_jwt', '_consent');
    cy.wait(waitTime2);
  });

  it('search contacts', () => {
    // Create a contact to be searched for.
    const rndInt = randomIntFromInterval(1, 9999);
    given_name = 'John';
    family_name = 'Doe' + rndInt;
    email = given_name + '.' + family_name + '@example.org';
    type = 'providers';
    id = 'datacite';
    roles = [];

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, id, Cypress.env('api_url'), cookie.value).then((id) => {
        cy.log('CREATED CONTACT: ' + given_name + ' ' + family_name + ' (' + id + ')');

        // Give it a little extra time to process the new contact so that we can search for it.
        cy.visit('/contacts');
        cy.url().should('include', '/contacts')
        cy.wait(waitTime)

        cy.get('input[name="query"]')
          .type(family_name + '{enter}', { force: true } )
          .get('[data-test-contact]')
          .should('contain', family_name);

          cy.get('h2.work').contains('DataCite');
          cy.get('li a.nav-link.active').contains('Contacts');
          cy.get('div#search').should('exist');
          //cy.get('div.panel.facets').should('exist');
      
          cy.get('a#add-contact').should('not.exist');      
      });
    });
  });

  // TBD - bug uncoverd.  Add github issue. Skip this test until the issue is fixed.
  it.skip('filter contacts', () => {
    // Create a contact for filters.
    const rndInt = randomIntFromInterval(1, 9999);
    given_name = 'John';
    family_name = 'Doe' + rndInt;
    email = given_name + '.' + family_name + '@example.org';
    type = 'providers';
    id = 'datacite';
    roles = ["service", "secondary_service", "technical", "secondary_technical", "billing", "voting", "secondary_billing"];

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, id, Cypress.env('api_url'), cookie.value).then((id) => {
        cy.log('CREATED CONTACT: ' + given_name + ' ' + family_name + ' (' + id + ')');

        // Give it a little extra time to process the new contact so that we can search for it.
        cy.visit('/contacts');
        cy.url().should('include', '/contacts')
        cy.wait(waitTime)

        cy.get('select').select('-created');
        cy.wait(waitTime);

        cy.get('a#role-name-service')
          .click()
          .get('[data-test-contact]')
          .should('contain', family_name);

        cy.wait(waitTime);
        cy.get('a#role-name-technical')
          .click()
          .get('[data-test-contact]')
          .should('contain', family_name);

        cy.wait(waitTime);
        cy.get('a#role-name-billing')
          .click()
          .get('[data-test-contact]')
          .should('contain', family_name);

        cy.wait(waitTime);
        cy.get('a#role-name-voting')
          .click()
          .get('[data-test-voting]')
          .should('contain', family_name);

        cy.wait(waitTime);
        cy.get('a#role-name-secondary_service')
          .click()
          .get('[data-test-contact]')
          .should('contain', family_name);

        cy.wait(waitTime);
        cy.get('a#role-name-secondary_technical')
          .click()
          .get('[data-test-contact]')
          .should('contain', family_name);

        cy.wait(waitTime);
        cy.get('a#role-name-secondary_billing')
          .click()
          .get('[data-test-contact]')
          .should('contain', family_name);
      });
    });
  });


  // TBD
  it('visiting contacts for member', () => {
    cy.visit('/providers/issda/contacts');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/issda/contacts');
    });
    cy.get('h2.work').contains('Irish Social Science Data Archive (ISSDA)');
    cy.get('li a.nav-link.active').contains('Contacts');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    cy.get('a#add-contact').contains('Add Contact');
  });

  it('visiting specific contact', () => {
    cy.visit('/contacts/44e763d0-87c3-4f00-a3ea-316f9c0c47cc');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(
        '/contacts/44e763d0-87c3-4f00-a3ea-316f9c0c47cc'
      );
    });
    cy.get('h2.work').contains('John Howard');
    cy.get('h3.member-results').contains('Contact Information');

    cy.get('a#edit-contact').contains('Update Contact');
    // cy.get('a#delete-contact').contains('Delete Contact');
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
        '/'
      );
    });
    cy.get('h2.work').contains('DataCite');
  });

  // TBD - Move these elsewhere.

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
