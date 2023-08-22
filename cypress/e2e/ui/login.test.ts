/// <reference types="cypress" />

// This recipe is very similar to the 'Logging In - XHR web form'
// except that is uses regular HTML form submission
// instead of using XHR's.

// We are going to test a few things:
// 1. Test using a regular form submission (old school POSTs)
// 2. Test error states
// 3. Test authenticated session states

// Be sure to run `npm start` to start the server
// before running the tests below.

describe('ACCEPTANCE: UI | LOGIN', function () {
  const waitTime = 1000;
  const waitTime2 = 2000;

  before(function () {
    /*
    Cypress.session.clearCurrentSessionData()
    cy.clearCookies()
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()   
    */
    cy.clearAllSessionStorage()
    cy.wait(waitTime2);
  })


  beforeEach(() => {
    cy.setCookie('_consent', 'true');
    // cy.setCookie('_fabrica', Cypress.env('client_admin_cookie'), { log: false });
  });

  // we can use these values to log in
  const username = Cypress.env('client_admin_username');
  const password = Cypress.env('client_admin_password');
  const bad_username = 'bad_username';
  const bad_password = 'bad_password';

  context('HTML form submission', function () {
    beforeEach(function () {
      cy.visit('/sign-in')
    })

    it('displays errors on incorrect login', function () {
      // incorrect username on purpose
      cy.get('input#account-field').type(bad_username)
      cy.get('input#password-field').type(bad_password)
      cy.get('div.register-card form button[type="submit"]').click();

      // we should have visible errors now
      cy.get('.alert-danger')
      .should('be.visible')
      .and('contain', 'Wrong account ID or password.')

      // and still be on the same URL
      cy.url().should('include', '/sign-in')
    })

    it('redirects to account INFO tab on success', function () {
      cy.get('input#account-field').type(username)
      cy.get('input#password-field').type(password, { log: false })
      cy.get('div.register-card form').submit()

      // we should be redirected to INFO for this account
      cy.url().should('include', '/repositories/datacite.test')
      cy.contains('ul.nav-tabs li.active a', "Info")

      // account link should have our username
      cy.get('#account_menu_link').contains(new RegExp(username, 'i'))

      // and our cookie should be set to 'cypress-session-cookie'
      cy.getCookie('_fabrica').should('exist')
    })
  })
})