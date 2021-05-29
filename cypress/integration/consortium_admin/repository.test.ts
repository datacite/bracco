 
 it('show repositories', () => {
  cy.visit('/providers/dc/repositories');
  cy.location().should((loc) => {
    expect(loc.pathname).to.eq('/providers/dc/repositories');
  });

  cy.get('h2.work').contains('DataCite');
  cy.get('h3.member-results').contains('Repositories');
  cy.get('[cy-data="alert"]').contains(
    "New repositories can't be created from this page."
  );
});

it('show repositories for consortium organization', () => {
  cy.visit('/providers/datacite/repositories');
  cy.location().should((loc) => {
    expect(loc.pathname).to.eq('/providers/datacite/repositories');
  });

  cy.get('h2.work').contains('DataCite');
  cy.get('h3.member-results').contains('Repositories');
  cy.get('#add-repository').should('exist');
});