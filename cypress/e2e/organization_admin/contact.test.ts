/// <reference types="cypress" />
/* eslint-disable no-undef */

function escapeRE(string) {
  //return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

describe('ACCEPTANCE: ORGANIZATION_ADMIN | CONTACTS', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;
  const waitTime3 = 3000;
  const waitTime4 = 4000;
  const min = 500000;
  const max = 999999;
  const provider_id = Cypress.env('organization_admin_username').toLowerCase()
  const test_contact_family_name_prefix = "OrganizationAdmin"

  before(function () {
    cy.login(Cypress.env('organization_admin_username'), Cypress.env('organization_admin_password'));
    cy.setCookie('_consent', 'true');
    cy.wait(waitTime2);
  })

  beforeEach(() => {
    // TBD - set up test environment
  });

  after(() => {
    cy.getCookie('_jwt').then((cookie) => {
      cy.deleteProviderTestContacts(provider_id, test_contact_family_name_prefix, Cypress.env('api_url'), cookie.value)
    })
    cy.clearAllSessionStorage()
  })

  it('visiting contacts for member', () => {
    cy.visit('/providers/' + provider_id + '/contacts');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/' + provider_id + '/contacts');
    });

    // Has Fabrica logo and correct navbar color
    cy.get('img.fabrica-logo').should('exist').should('have.attr', 'src').should('include', 'fabrica-logo.svg');
    cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(0, 177, 226)');
    
    cy.get('h2.work').contains('DataCite');
    cy.get('li a.nav-link.active').contains('Contacts');
    cy.get('body').then(($body) => {
      if ($body.find('div.alert.alert-warning.show').length > 0) {
        cy.get('div.alert.alert-warning.show').contains('No contacts found.');
      } else {
        cy.get('div#search').should('exist');
        cy.get('div.panel.facets').should('exist');
        cy.get('button.export-basic-metadata').should('not.exist');
      }
      cy.get('a#add-contact').should('exist');
    })
  });

  it('search contacts', () => {
    // Create a contact to be searched for.
    var rndInt = randomIntFromInterval(min, max);
    var given_name = 'Jack';
    var family_name = test_contact_family_name_prefix + rndInt;
    var email = given_name + '.' + family_name + '@example.org';
    var type = 'providers';
    var roles: never[] = [];

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, provider_id, Cypress.env('api_url'), cookie.value).then((id) => {
        cy.log('CREATED CONTACT: ' + given_name + ' ' + family_name + ' (' + id + ')');

        // Give it a little extra time to process the new contact so that we can search for it.
        cy.visit('/providers/' + provider_id + '/contacts');
        cy.url().should('include', '/providers/' + provider_id + '/contacts')
        cy.wait(waitTime)

        cy.get('input[name="query"]')
          .type(family_name + '{enter}', { force: true } )
          .get('[data-test-contact]')
          .should('contain', family_name);
      });

      // Create DOI button
      cy.get('.create-doi-button').should('not.exist');      
    });
  });

  it('filter contacts', () => {
    // Create a contact for filters.
    var rndInt = randomIntFromInterval(min, max);
    var given_name = 'Jack';
    var family_name = test_contact_family_name_prefix + rndInt;
    var email = given_name + '.' + family_name + '@example.org';
    var type = 'providers';
    var roles = ["service", "secondary_service", "technical", "secondary_technical", "billing"];

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, provider_id, Cypress.env('api_url'), cookie.value).then((id) => {
        cy.log('CREATED CONTACT: ' + given_name + ' ' + family_name + ' (' + id + ')');

        // Give it a little extra time to process the new contact so that we can search for it.
        cy.visit('/providers/' + provider_id + '/contacts');
        cy.url().should('include', '/providers/' + provider_id + '/contacts')
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

  // Temporarily skip form submit checking.  Something is clearing the input fields after they have been typed into.
  it('create a contact', () => {
    var rndInt = randomIntFromInterval(min, max);
    var given_name = 'Jack';
    var family_name = test_contact_family_name_prefix + rndInt;
    var email = given_name + '.' + family_name + '@example.org';

    cy.visit('/providers/' + provider_id + '/contacts/new');
    cy.url().should('include', '/providers/' + provider_id + '/contacts/new').then(() => {
      cy.wait(waitTime);

      cy.get('h3.edit').contains('Add Contact');
      cy.wait(waitTime);

      cy.get('input#givenName-field').should('be.visible').type(given_name, { force: true }).clickOutside();
      cy.get('input#familyName-field').should('be.visible').type(family_name, { force: true }).clickOutside();
      cy.get('input#email-field').should('be.visible').type(email, { force: true }).clickOutside();

      cy.get('.alert-warning').contains(/The contact entered may receive notifications/i)
        .within(() => {
          cy.get('a[href*="privacy-policy"]').should('be.visible');
        }
      );

      ////////// DONE FILLING IN FORM.  PRESS THE CREATE BUTTON.
      cy.get('button#add-contact').should('be.visible').click({force: true}).then(() => {
        cy.wait(waitTime);
        cy.location().then((loc) => {
          expect(loc.pathname).to.contain('/contacts/');
        });
        // TBD: Re-enable these when form filling bug is fixed.  These fields are filled and then cleared before the form submit.
        //cy.get('h2.work').contains(given_name + ' ' + family_name);
        //cy.get('h3.member-results').contains('Contact Information');
      });
    });
  });

  it('visiting specific contact', () => {
    // Create a contact to be visited.
    var  rndInt = randomIntFromInterval(min, max);
    var given_name = 'Jack';
    var family_name = test_contact_family_name_prefix + rndInt;
    var email = given_name + '.' + family_name + '@example.org';
    var type = 'providers';
    //roles = ["service", "secondary_service", "technical", "secondary_technical", "billing"];
    var roles: never[] = [];

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, provider_id, Cypress.env('api_url'), cookie.value).then((id) => {
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

  it('update specific contact', () => {
    // Create a contact to be updated.
    var  rndInt = randomIntFromInterval(min, max);
    var given_name = 'Jack';
    var family_name = test_contact_family_name_prefix + rndInt;
    var email = given_name + '.' + family_name + '@example.org';
    var updated_given_name = 'Jonathan';
    var updated_email = updated_given_name + '.' + family_name + '@example.org';
    var type = 'providers';
    //roles = ["service", "secondary_service", "technical", "secondary_technical", "billing"];
    var roles: never[] = [];

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, provider_id, Cypress.env('api_url'), cookie.value).then((id) => {
        cy.log('CREATED CONTACT: ' + given_name + ' ' + family_name + ' (' + id + ')');

        cy.visit('/contacts/' + id + '/edit');
        cy.url().should('include', '/contacts/' + id + '/edit')
        cy.wait(waitTime);

        cy.get('h2.work').contains(given_name + ' ' + family_name);
        cy.get('h3.edit').contains('Update Contact');

        cy.get('input#givenName-field').clear({force: true})
          .type(updated_given_name +'{enter}', {force: true});
        cy.get('input#familyName-field').should('exist');
        cy.get('input#email-field').should('exist');

        cy.get('.alert-warning').contains(
          'The contact may receive notifications about administration'
        );

        cy.get('button#update-contact').contains('Update Contact').click({force: true})
          .then(() => {
            cy.wait(waitTime);
            cy.location().should((loc) => {
              expect(loc.pathname).to.eq('/contacts/' + id);
            });
            cy.get('h2.work').contains(updated_given_name + ' ' + family_name);
          });
      });
    });
  });

  it('delete specific contact', () => {
    // Create a contact to be deleted.
    var rndInt = randomIntFromInterval(min, max);
    var given_name = 'Jack';
    var family_name = test_contact_family_name_prefix + rndInt;
    var email = given_name + '.' + family_name + '@example.org';
    var type = 'providers';
    //roles = ["service", "secondary_service", "technical", "secondary_technical", "billing"];
    var roles: never[] = [];

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, provider_id, Cypress.env('api_url'), cookie.value).then((id) => {
        cy.log('CREATED CONTACT: ' + given_name + ' ' + family_name + ' (' + id + ')');

        cy.visit('/contacts/' + id);
        cy.url().should('include', '/contacts/' + id);
        cy.wait(waitTime);
        
        cy.get('a#delete-contact').contains('Delete Contact').click();
        cy.wait(waitTime);

        cy.get('h2.work').contains(given_name + ' ' + family_name);
        cy.get('label.control-label').contains(
          'Are you sure you want to delete this contact? This action cannot be undone.'
        );

        cy.wait(waitTime);
        cy.get('input#confirm-delete-field').click({ force: true }).type('Delete', { force: true });
        cy.wait(waitTime);
        cy.get('#confirm-delete-field').should('have.class', 'is-valid');

        cy.get('button#delete').contains('Delete').click({force: true});
        cy.wait(waitTime3);
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/providers/' + provider_id + '/contacts');
        });
      });
    });
  });

  // TBD - custom command for adding service contact to repository so we can test this.
  it('show member settings', () => {
    cy.visit('/providers/' + provider_id + '/settings');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/' + provider_id + '/settings');
    });

    cy.get('h2.work').contains('DataCite');
    cy.get('h3.member-results').contains('Contact Information');
    cy.get('[cy-data="service"]').should('exist');
  });

  it('can see contacts when using capitalized identifier URL subdirectory', () => {
    cy.visit('/providers/' + provider_id.toUpperCase() + '/contacts');
    cy.url().should('include', '/providers/' + provider_id.toUpperCase() + '/contacts').then(() => {

      // Prefix page should be populated.
      cy.contains('No contacts found.').should('not.exist')
    });
  });
});
