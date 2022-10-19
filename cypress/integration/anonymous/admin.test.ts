describe('ACCEPTANCE: ANONYMOUS | NO ADMIN ACCESS', function () {
  const site_title = new RegExp('Datacite.*Fabrica', 'i')

  it('is not logged in', function () {
    cy.visit('/')
    cy.get('a#sign-in').should('exist');
    cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(0, 177, 226)');
  })

  it('visiting homepage', function () {
    cy.visit('/')
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.get('div.motto h1').contains(site_title);
    cy.get('a#sign-in').should('exist');
    cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(0, 177, 226)');
  })

  // the following pages require authentication. Redirects to homepage otherwise.
  it('visiting info', function () {
    cy.visit('/info')
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.get('div.motto h1').contains(site_title);
    cy.get('a#sign-in').should('exist');
    cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(0, 177, 226)');
  })

   it('visiting providers', function () {
    cy.visit('/providers')
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.get('div.motto h1').contains(site_title);
    cy.get('a#sign-in').should('exist');
    cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(0, 177, 226)');
  })

  it('visiting repositories', function () {
    cy.visit('/repositories')
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.get('div.motto h1').contains(site_title);
    cy.get('a#sign-in').should('exist');
    cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(0, 177, 226)');
  })

  it('visiting prefixes', function () {
    cy.visit('/prefixes')
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.get('div.motto h1').contains(site_title);
    cy.get('a#sign-in').should('exist');
    cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(0, 177, 226)');
  })

  it('visiting prefix 10.80225', function () {
    cy.visit('/prefix/10.80225')
    cy.get('div.alert-warning').should('contain', 'The page was not found.');
    cy.get('a#sign-in').should('exist');
    cy.get('ul.navbar-nav').should('have.css', 'background-color', 'rgb(0, 177, 226)');
  })

})
