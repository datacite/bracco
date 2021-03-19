describe('My First Test', function () {

  it('is not logged in', function () {
    cy.visit('/')
    cy.get('a#account_menu_link').should('not.exist');
  })

  it('visiting homepage', function () {
    cy.visit('/')
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.get('div.motto h1').should('contain', Cypress.env('site_title');
  })

  // the following pages require authentication. Redirects to homepage otherwise.
  it('visiting info', function () {
    cy.visit('/info')
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.get('div.motto h1').should('contain', Cypress.env('site_title'));
  })

   it('visiting providers', function () {
    cy.visit('/providers')
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.get('div.motto h1').should('contain', Cypress.env('site_title'));
  })

  it('visiting repositories', function () {
    cy.visit('/repositories')
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.get('div.motto h1').should('contain', Cypress.env('site_title'));
  })

  it('visiting prefixes', function () {
    cy.visit('/prefixes')
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.get('div.motto h1').should('contain', Cypress.env('site_title'));
  })

  it('visiting prefix 10.80225', function () {
    cy.visit('/prefix/10.80225')
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.get('div.motto h1').should('contain', Cypress.env('site_title'));
  })

})