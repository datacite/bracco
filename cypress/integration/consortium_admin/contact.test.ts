/// <reference types="cypress" />
/* eslint-disable no-undef */

function escapeRE(string) {
  //return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

describe('ACCEPTANCE: CONSORTIUM_ADMIN | CONTACTS', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;
  const waitTime3 = 3000;
  const waitTime4 = 4000;
  const min = 5000;
  const max = 9999;

  before(function () {
    cy.login(Cypress.env('consortium_admin_username'), Cypress.env('consortium_admin_password'));
    cy.setCookie('_consent', 'true');
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_fabrica', '_jwt', '_consent');
    cy.wait(waitTime2);
  });

  it('visiting contacts for member', () => {
    cy.visit('/providers/dc/contacts');
    cy.url().should('include', '/providers/dc/contacts')
    cy.wait(waitTime);

    // Has Fabrica logo and correct navbar color
    cy.get('img.fabrica-logo').should('exist').should('have.attr', 'src').should('include', 'fabrica-logo.svg');
    cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(36, 59, 84)');

    cy.get('h2.work').contains('DataCite Consortium');
    cy.get('li a.nav-link.active').contains('Contacts');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    cy.get('a#add-contact').contains('Add Contact');
  });

  it('search contacts', () => {
    // Create a contact to be searched for.
    const rndInt = randomIntFromInterval(min, max);
    given_name = 'John';
    family_name = 'Doe' + rndInt;
    email = given_name + '.' + family_name + '@example.org';
    type = 'providers';
    id = 'dc';
    roles = [];

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, id, Cypress.env('api_url'), cookie.value).then((id) => {
        cy.log('CREATED CONTACT: ' + given_name + ' ' + family_name + ' (' + id + ')');

        // Give it a little extra time to process the new contact so that we can search for it.
        cy.visit('/providers/dc/contacts');
        cy.url().should('include', '/providers/dc/contacts')
        cy.wait(waitTime)

        cy.get('input[name="query"]')
          .type(family_name + '{enter}', { force: true } )
          .get('[data-test-contact]')
          .should('contain', family_name);
      });
    });
  });

  // filters are [service, billing, technical, secondary_service, secondary_technical]
  it('filter contacts', () => {
    // Create a contact to be searched for.
    const rndInt = randomIntFromInterval(min, max);
    given_name = 'John';
    family_name = 'Doe' + rndInt;
    email = given_name + '.' + family_name + '@example.org';
    type = 'providers';
    id = 'dc';
    roles = ["service", "secondary_service", "technical", "secondary_technical", "billing"];

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, id, Cypress.env('api_url'), cookie.value).then((id) => {
        cy.log('CREATED CONTACT: ' + given_name + ' ' + family_name + ' (' + id + ')');

        // Give it a little extra time to process the new contact so that we can search for it.
        cy.visit('/providers/dc/contacts');
        cy.url().should('include', '/providers/dc/contacts')
        cy.wait(waitTime)

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
        cy.get('a#role-name-secondary_service')
          .click()
          .get('[data-test-contact]')
          .should('contain', family_name);

        cy.wait(waitTime);
        cy.get('a#role-name-secondary_technical')
          .click()
          .get('[data-test-contact]')
          .should('contain', family_name);
      });
    });
  });

  it('create a contact', () => {
    const rndInt = randomIntFromInterval(min, max);
    given_name = 'John';
    family_name = 'Doe' + rndInt;
    email = given_name + '.' + family_name + '@example.org';

    cy.visit('/providers/dc/contacts/new');
    cy.url().should('include', '/providers/dc/contacts/new').then(() => {
      cy.wait(waitTime);

      cy.get('h3.edit').contains('Add Contact');

      cy.get('input#givenName-field').should('be.visible').type(given_name, { force: true })
        .clickOutside();
      cy.get('input#familyName-field').should('be.visible').type(family_name, { force: true })
        .clickOutside();
      cy.get('input#email-field').should('be.visible').type(email, { force: true })
        .clickOutside();

      cy.get('.alert-warning').contains(/The contact entered may receive notifications/i)
        .within(() => {
          cy.get('a[href*="privacy.html"]').should('be.visible');
        }
      );

      ////////// DONE FILLING IN FORM.  PRESS THE CREATE BUTTON.
      cy.get('button#add-contact').should('be.visible').click({force: true}).then(() => {
        cy.wait(waitTime);
        cy.location().should((loc) => {
          expect(loc.pathname).to.contain('/providers/dc');
        });
      });
    });
  });

  /*
     TO DO: Commenting out the next 3 tests waiting for a bug fix.  (visit, update, delete)
     Cannot get to contact pages with '/contacts/uid'.
   */

  it.skip('visiting specific contact', () => {
    // Create a contact to be visited.
    const rndInt = randomIntFromInterval(min, max);
    given_name = 'John';
    family_name = 'Doe' + rndInt;
    email = given_name + '.' + family_name + '@example.org';
    type = 'providers';
    id = 'dc';
    //roles = ["service", "secondary_service", "technical", "secondary_technical", "billing"];
    roles = [];

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, id, Cypress.env('api_url'), cookie.value).then((id) => {
        cy.log('CREATED CONTACT: ' + given_name + ' ' + family_name + ' (' + id + ')');

        cy.visit('/contacts/' + id);
        cy.url().should('include', '/contacts/' + id)
        cy.wait(waitTime);

        cy.get('h2.work').contains(given_name + ' ' + family_name);
        cy.get('h3.member-results').contains('Contact Information');

        cy.get('a#edit-contact').contains('Update Contact');
        cy.get('a#delete-contact').contains('Delete Contact');
     });
   });
  });

  it.skip('update specific contact', () => {
    // Create a contact to be updated.
    const rndInt = randomIntFromInterval(min, max);
    given_name = 'John';
    family_name = 'Doe' + rndInt;
    email = given_name + '.' + family_name + '@example.org';
    type = 'providers';
    id = 'dc';
    //roles = ["service", "secondary_service", "technical", "secondary_technical", "billing"];
    roles = [];

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, id, Cypress.env('api_url'), cookie.value).then((id) => {
        cy.log('CREATED CONTACT: ' + given_name + ' ' + family_name + ' (' + id + ')');

        cy.visit('/contacts/' + id + '/edit');
        cy.url().should('include', '/contacts/' + id + '/edit')
        cy.wait(waitTime);

        cy.get('h2.work').contains(given_name + ' ' + family_name);
        cy.get('h3.edit').contains('Update Contact');

        cy.get('input#givenName-field').should('exist');
        cy.get('input#familyName-field').should('exist');
        cy.get('input#email-field').should('exist');

        cy.get('.alert-warning').contains(
          'The contact may receive notifications about administration'
        );
        cy.get('button#update-contact').contains('Update Contact');

        // TO DO: Update a field. Press the update button. Check for update on resulting page.
      });
    });
  });

  it.skip('delete specific contact', () => {
    // Create a contact to be deleted.
    const rndInt = randomIntFromInterval(min, max);
    given_name = 'John';
    family_name = 'Doe' + rndInt;
    email = given_name + '.' + family_name + '@example.org';
    type = 'providers';
    id = 'dc';
    //roles = ["service", "secondary_service", "technical", "secondary_technical", "billing"];
    roles = [];

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, id, Cypress.env('api_url'), cookie.value).then((id) => {
        cy.log('CREATED CONTACT: ' + given_name + ' ' + family_name + ' (' + id + ')');

        cy.visit('/contacts/' + id + '/delete');
        cy.url().should('include', '/contacts/' + id + '/delete');
        cy.wait(waitTime);

        cy.get('h2.work').contains(given_name + ' ' + family_name);
        cy.get('label.control-label').contains(
          'Are you sure you want to delete this contact? This action cannot be undone.'
        );

        cy.get('input#confirm-delete-field').should('exist');
        cy.get('button#delete').contains('Delete');
      });
    });
  });

  // TBD: need custom command to create a repository with missing contacts.
  it('show repositories for consortium organization with missing contacts', () => {
    cy.visit('/providers/mgxi/repositories');
    cy.url().should('include', '/providers/mgxi/repositories')
    cy.wait(waitTime);

    cy.get('h2.work').contains('ETH Zurich');
    cy.get('h3.work').contains('Atlas of Innovations');
    cy.get('#add-repository').should('exist');
  });
});
