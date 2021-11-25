/// <reference types="cypress" />
/* eslint-disable no-undef */

function escapeRE(string) {
  //return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

describe('ACCEPTANCE: CONSORTIUM_ADMIN | SETTINGS', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;

  before(function () {
    cy.login(Cypress.env('consortium_admin_username'), Cypress.env('consortium_admin_password'));
    cy.setCookie('_consent', 'true');
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_fabrica', '_jwt', '_consent');
    cy.wait(waitTime2);
  });

  it('is logged in to homepage', () => {
    cy.visit('/providers/dc');
    cy.url().should('include', '/providers/dc').then (() => {
      cy.get('h2.work').contains('DataCite Consortium');
      cy.get('a#account_menu_link').should('contain', 'DC');

      cy.get('ul.nav-tabs li a').contains(/Info/i)
        .and('have.attr', 'href').and('include', '/providers/dc/info');
      cy.get('ul.nav-tabs li.active a').contains(/Settings/i)
        .and('have.attr', 'href').and('include', '/providers/dc');
      cy.get('ul.nav-tabs li a').contains(/Consortium Organizations/i)
        .and('have.attr', 'href').and('include', '/providers/dc/organizations');
      cy.get('ul.nav-tabs li a').contains(/Contacts/i)
        .and('have.attr', 'href').and('include', '/providers/dc/contacts');
      cy.get('ul.nav-tabs li a').contains(/Repositories/i)
        .and('have.attr', 'href').and('include', '/providers/dc/repositories');
      cy.get('ul.nav-tabs li a').contains(/Prefixes/i)
        .and('have.attr', 'href').and('include', '/providers/dc/prefixes');
      cy.get('ul.nav-tabs li a').contains(/DOIs/i)
        .and('have.attr', 'href').and('include', '/providers/dc/dois');

      cy.get('.btn-toolbar').within(($btnToolbar) => {
        cy.get('.btn-group-vertical a#set-password-provider').contains(/Set\s*Password/i)
          .and('have.attr', 'href').and('include', '/providers/dc/change');
        cy.get('.btn-group-vertical a#edit-provider').contains(/Update\s*Member/i)
          .and('have.attr', 'href').and('include', '/providers/dc/edit');
      });

      cy.get('.metadata').within(($metadata) => {
        cy.get('h5').contains(/Record\s*created/i);
        cy.get('h5').contains(/Record\s*last\s*modified/i);
      });

      cy.get('h3.member-results').contains('Organization Information');

      cy.get('h5').contains(/Member\s*ID/i).parent().parent('.panel').within((panel) => {
        cy.get('h5').contains(/Member\s*ID/i);
        cy.get('div.panel-body').contains(/DC/i);
        cy.get('h5').contains(/ROR ID/i);
        cy.get('a').contains('https://ror.org').and('have.attr', 'href').and('include', 'https://ror.org');
        cy.get('h5').contains(/Tax\s*Status/i);
        cy.get('div.panel-body').contains(/Non-Profit/i);
        cy.get('h5').contains(/Organization\s*Name/i);
        cy.get('div.panel-body').contains(/DataCite\s*Consortium/i);
        cy.get('h5').contains(/System\s*Email/i);
        cy.get('a').contains('info@datacite.org').and('have.attr', 'href').and('include', 'mailto:info@datacite.org');
        cy.get('h5').contains(/Website/i);
        cy.get('a').contains('https://datacite.org').and('have.attr', 'href').and('include', 'https://datacite.org');
        cy.get('h5').contains(/Country/i);
        cy.get('div.panel-body').contains(/Germany/i);
        cy.get('h5').contains(/Organization\s*Type/i);
        cy.get('div.panel-body').contains(/Service\s*Provider/i);
        cy.get('h5').contains(/Focus\s*Area/i);
        cy.get('div.panel-body').contains(/General/i);
      });

      cy.get('h3.member-results').contains('Contact Information');

      cy.get('h5').contains(/Voting\s*Representative/i).parent().parent('.panel').within((panel) => {
        cy.get('h5').contains(/Voting\s*Representative/i);
        cy.get('[cy-data="voting"] a').contains(/John\s*Doe/i).and('have.attr', 'href').and('include', 'mailto:info@datacite.org');
        cy.get('h5').contains(/Service\s*Contact/i);
        cy.get('[cy-data="service"] a').contains(/John\s*Doe/i).and('have.attr', 'href').and('include', 'mailto:John.Doe9200@example.org');
        cy.get('h5').contains(/Billing\s*Contact/i);
        cy.get('[cy-data="billing"] a').contains(/John\s*Smith/i).and('have.attr', 'href').and('include', 'mailto:john.smith@gmail.com');
      });

      cy.get('h3.member-results').contains('Billing Information');
      cy.get('.icon-warning').contains(/Please provide this information./);
    });
  });

  it('/info redirects to homepage', () => {
    cy.visit('/info');
    cy.url().should('include', '/providers/dc').then (() => {
      cy.get('a#account_menu_link').should('contain', 'DC');
    });
  });

  it('/providers redirects to homepage', () => {
    cy.visit('/providers');
    cy.url().should('include', '/providers/dc').then (() => {
      cy.get('a#account_menu_link').should('contain', 'DC');
    });
  });

  it('/contacts redirects to homepage', () => {
    cy.visit('/contacts');
    cy.url().should('include', '/providers/dc').then (() => {
      cy.get('a#account_menu_link').should('contain', 'DC');
    });
  });

  it('/repositories redirects to homepage', () => {
    cy.visit('/repositories');
    cy.url().should('include', '/providers/dc').then (() => {
      cy.get('a#account_menu_link').should('contain', 'DC');
    });
  });

  it('/prefixes redirects to homepage', () => {
    cy.visit('/prefixes');
    cy.url().should('include', '/providers/dc').then (() => {
      cy.get('a#account_menu_link').should('contain', 'DC');
    });
  });

  it('/dois redirects to homepage', () => {
    cy.visit('/dois');
    cy.url().should('include', '/providers/dc').then (() => {
      cy.get('a#account_menu_link').should('contain', 'DC');
    });
  });

  it('has password settings page', () => {
    cy.visit('/providers/dc/change');
    cy.url().should('include', '/providers/dc/change').then (() => {

      cy.get('h2.work').contains('DataCite Consortium');
      cy.get('a#account_menu_link').should('contain', 'DC');

      cy.get('h3').contains(/Set Password/i);

      cy.get('form').within(($form) => {
        cy.get('input#password-input-field').should('be.visible');
        cy.get('input#confirm-password-input-field').should('be.visible');
        cy.get('button[type=submit]').should('be.visible');
      });
    }).then (() => {
      cy.get('button').contains(/Cancel/i).should('be.visible').click({force: true}).then(() => {
        cy.wait(waitTime);
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/providers/dc');
        });
      });
    });
  });

  // TBD - Could do more testing here. Only cursory testing for
  // presence of field objects. No testing of form behavior yet.
  it('has a member settings page', () => {
    cy.visit('/providers/dc/edit');
    cy.url().should('include', '/providers/dc/edit').then(() => {

      cy.get('h2.work').contains('DataCite Consortium');
      cy.get('a#account_menu_link').should('contain', 'DC');

      cy.get('h3.edit').contains(/Update\s*Member/);

      cy.get('form').within(($form) => {
        cy.get('h3.member-results').contains('Organization Information');
        cy.get('#member-id').should('be.visible');
        cy.get('#ror-id').should('be.visible');
        cy.get('#name').should('be.visible');
        cy.get('#display-name').should('be.visible');
        cy.get('#system-email').should('be.visible');
        cy.get('#group-email').should('be.visible');
        cy.get('#website').should('be.visible');
        cy.get('#twitter-handle').should('be.visible');
        cy.get('#organization-type').should('be.visible');
        cy.get('#focus-area').should('be.visible');
        cy.get('#description').should('be.visible');
        cy.get('#upload-file').contains(/Upload\s*Logo/);

        cy.get('h3.member-results').contains('Contact Information');
        cy.get('.alert-info').contains(/Contacts are created.*and then assigned roles here./i )
        cy.get('#voting-contact').should('be.visible');
        cy.get('#service-contact').should('be.visible');
        cy.get('#secondary-service-contact').should('be.visible');
        cy.get('#technical-contact').should('be.visible');
        cy.get('#secondary-technical-contact').should('be.visible');
        cy.get('#billing-contact').should('be.visible');
        cy.get('#secondary-billing-contact').should('be.visible');

        cy.get('h3.member-results').contains('Billing Information');
        cy.get('#billing-information-department').should('be.visible');
        cy.get('#billing-information-organization').should('be.visible');
        cy.get('#billing-information-street').should('be.visible');
        cy.get('#billing-information-city').should('be.visible');
        cy.get('#billing-information-postcode').should('be.visible');
        cy.get('#billing-information-country').should('be.visible');
        cy.get('.alert-warning').contains(/The contacts entered may receive notifications/i )


        cy.get('button#update-provider').should('be.visible');
      })
    }).then(() => {
      cy.get('button').contains(/Cancel/i).should('be.visible').click({force: true}).then(() => {
        cy.wait(waitTime2);
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/providers/dc');
        });
      });
    });
  });
});
