describe('ACCEPTANCE: ANONYMOUS | NO ADMIN ACCESS', function () {
  const waitTime = 1000;
  const waitTime2 = 2000;

  const site_title = new RegExp('Datacite.*Fabrica', 'i')

  before(function () {
    //Cypress.session.clearAllSavedSessions()
    Cypress.session.clearCurrentSessionData()
    cy.clearCookies()
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()

    cy.wait(waitTime2);
  })

  it('is not logged in', function () {
    cy.visit('/')
    cy.get('a#sign-in').should('exist');
  })

  it('visiting homepage', function () {
    cy.visit('/')
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.get('div.motto h1').contains(site_title);
    cy.get('a#sign-in').should('exist');

    // Create DOI button
    cy.get('.create-doi-button').should('not.exist');      
  })

  // the following pages require authentication. Redirects to homepage otherwise.
  it('visiting settings', function () {
    cy.visit('/settings')
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.get('div.motto h1').contains(site_title);
    cy.get('a#sign-in').should('exist');
  })

   it('visiting providers', function () {
    cy.visit('/providers')
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.get('div.motto h1').contains(site_title);
    cy.get('a#sign-in').should('exist');
  })

  it('visiting repositories', function () {
    cy.visit('/repositories')
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.get('div.motto h1').contains(site_title);
    cy.get('a#sign-in').should('exist');
  })

  it('visiting prefixes', function () {
    cy.visit('/prefixes')
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.get('div.motto h1').contains(site_title);
    cy.get('a#sign-in').should('exist');
  })

  it('visiting prefix 10.80225', function () {
    cy.visit('/prefix/10.80225')
    cy.get('div.alert-warning').should('contain', 'The page was not found.');
    cy.get('a#sign-in').should('exist');
  })

})
