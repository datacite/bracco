/// <reference types="cypress" />
/* eslint-disable no-undef */
// https://github.com/cypress-io/cypress/issues/5830

describe('Admin: Client_Admin, doi', () => {
  const waitTimeBetIt = 1000;
  const waitTime = 1000;
  const waitTime1 = 1000;

  beforeEach(() => {
    cy.setCookie('_consent', 'true');
    cy.setCookie('_fabrica', Cypress.env('client_admin_cookie'), { log: false });
    cy.wait(waitTimeBetIt);
  });

  ////////////////////////////////

  it('visiting repository DataCite Test info', () => {
    cy.visit('/repositories/datacite.test/info');
    cy.url().should('include', '/repositories/datacite.test/info');
    cy.wait(waitTime);

    cy.contains('ul.nav-tabs li.active a', "Info");
    cy.get('h2.work').contains('DataCite Test Repository');
    cy.get('a#account_menu_link').contains('DATACITE.TEST');
  });

  it('visiting repository DataCite Test settings', () => {
    cy.visit('/repositories/datacite.test');
    cy.url().should('include', '/repositories/datacite.test');
    cy.wait(waitTime);

    cy.contains('ul.nav-tabs li.active a', "Settings");
    cy.get('h2.work').contains('DataCite Test Repository');
    cy.get('a#account_menu_link').contains('DATACITE.TEST');
  });

  it('visiting repository DataCite Test prefixes', () => {
    cy.visit('/repositories/datacite.test/prefixes');
    cy.url().should('include', '/repositories/datacite.test/prefixes');
    cy.wait(waitTime);

    cy.contains('ul.nav-tabs li.active a', "Prefixes");
    cy.get('h2.work').contains('DataCite Test Repository');
    cy.get('a#account_menu_link').contains('DATACITE.TEST');
  });

  it('visiting dois', () => {
    cy.visit('/repositories/datacite.test/dois');
    cy.url().should('include', '/repositories/datacite.test/dois');
    cy.wait(waitTime);

    cy.contains('ul.nav-tabs li.active a', "DOIs");
    cy.get('h2.work').contains('DataCite Test Repository');
    cy.get('a#account_menu_link').contains('DATACITE.TEST');
  });

  it('visiting specific doi', () => {
    cy.visit('/dois/10.80225%2Fda52-7919');
    cy.url().should('include', '/dois/10.80225%2Fda52-7919');
    cy.wait(waitTime);

    cy.contains('h2.work', "10.80225/da52-7919");
  });

  ////////////////////////////////

  it('visiting the form and adding url', () => {
    cy.visit('/repositories/datacite.test/dois/new');
    cy.url().should('include', '/repositories/datacite.test/dois/new');
    cy.wait(waitTime);

    cy.get('input#url-field').should('be.visible').type('https://example.org', { force: true });
    cy.wait(waitTime);

    cy.get('button#doi-create').click();
    cy.wait(waitTime);

    cy.get('div').contains('DOI created');
    cy.get('div a').contains('https://example.org');
  });

  it('visiting the form and adding creator', () => {
    cy.visit('/repositories/datacite.test/dois/new');
    cy.url().should('include', '/repositories/datacite.test/dois/new');
    cy.wait(waitTime);

    cy.get('input[data-test-name]').should('be.visible').type('Miller, Elizabeth', { force: true });
    cy.wait(waitTime);

    cy.get('#toggle-creators').should('be.visible').click({ force: true });
    cy.wait(waitTime);

    cy.get('#toggle-creators').contains('Show 1 creator');
    cy.wait(waitTime);

    cy.get('button#doi-create').click();
    cy.wait(waitTime);

    cy.get('div').contains('DOI created');
    cy.get('div').contains('Miller, Elizabeth');
  });

  it('visiting the form and selecting title', () => {
    cy.visit('/repositories/datacite.test/dois/new');
    cy.url().should('include', '/repositories/datacite.test/dois/new');
    cy.wait(waitTime);

    cy.get('input.title-field').should('be.visible').type('The title', { force: true });
    cy.wait(waitTime);

    cy.get('#toggle-titles').should('be.visible').click({ force: true });
    cy.wait(waitTime);

    cy.get('#toggle-titles').contains('Show 1 title');
    cy.wait(waitTime);

    cy.get('button#doi-create').click();
    cy.wait(waitTime);

    cy.get('div').contains('DOI created');
    cy.get('div').contains('The title');
  });

  it('visiting the form and adding publisher', () => {
    cy.visit('/repositories/datacite.test/dois/new');
    cy.url().should('include', '/repositories/datacite.test/dois/new');
    cy.wait(waitTime);

    cy.get('#publisher-field').should('be.visible').type('DataCite', { force: true });
    cy.wait(waitTime);

    cy.get('button#doi-create').click( { force: true } );
    cy.wait(waitTime);

    cy.get('div').contains('DOI created');
    cy.get('div.metadata').contains('via DataCite');
  });

  it('visiting the form and adding publication year', () => {
    cy.visit('/repositories/datacite.test/dois/new');
    cy.url().should('include', '/repositories/datacite.test/dois/new');
    cy.wait(waitTime);

    cy.get('#publication-year-field').should('be.visible').type('2020', { force: true });
    cy.wait(waitTime);

    cy.get('button#doi-create').click( { force: true } );
    cy.wait(waitTime);

    cy.get('div').should('contain', 'DOI created');
    cy.get('div.metadata').contains('published 2020');
  });

  it('visiting the form and adding resource type general', () => {
    cy.visit('/repositories/datacite.test/dois/new');
    cy.url().should('include', '/repositories/datacite.test/dois/new');
    cy.wait(waitTime);

    // Causes the aria dropdown to be populated and displayed so that selection can be made.
    cy.get('div#resource-type-general div[role="button"]').click( { force: true } );
    cy.wait(waitTime);
    // Makes the selection.
    cy.get("ul.ember-power-select-options li").contains("Text").click( { force: true } );
    cy.wait(waitTime);

    cy.get('button#doi-create').click( { force: true } );
    cy.wait(waitTime);

    cy.get('div').should('contain', 'DOI created');
    cy.get('div.metadata').contains('Text');
  });

  it('visiting the form and selecting language', () => {
    cy.visit('/repositories/datacite.test/dois/new');
    cy.url().should('include', '/repositories/datacite.test/dois/new');
    cy.wait(waitTime);

    // Causes the aria dropdown to be populated and displayed so that selection can be made.
    cy.get('div#doi-language div[role="button"]').click( { force: true } );
    cy.wait(waitTime);
    // Makes the selection.
    cy.get("ul.ember-power-select-options li").contains("English").click( { force: true } );
    cy.wait(waitTime);

    cy.get('button#doi-create').click( { force: true } );
    cy.wait(waitTime);

    cy.get('div').should('contain', 'DOI created');
  });

  it('visiting the form and adding geoLocationPlace', () => {
    cy.visit('/repositories/datacite.test/dois/new');
    cy.url().should('include', '/repositories/datacite.test/dois/new');
    cy.wait(waitTime);

    cy.get('#add-geolocation').click( { force: true } );
    cy.wait(waitTime);

    cy.get('[data-test-geo-location-place]').should('be.visible').type('Amsterdam, Novoravis hotel', { force: true });
    cy.wait(waitTime);

    cy.get('#toggle-geolocations').should('be.visible').click({ force: true });
    cy.wait(waitTime);

    cy.get('#toggle-geolocations').contains('Show 1 geolocation');
    cy.wait(waitTime);

    cy.get('button#doi-create').click( { force: true } );
    cy.wait(waitTime);

    cy.get('div').should('contain', 'DOI created');
  });

  it('visiting the form and entering new subject', () => {
    cy.visit('/repositories/datacite.test/dois/new');
    cy.url().should('include', '/repositories/datacite.test/dois/new');
    cy.wait(waitTime);

    cy.get('#add-subject').click( { force: true } );
    cy.wait(waitTime);

    cy.get('.ember-power-select-placeholder').contains('Search Subject from the OECD Fields of Science and Technology (FOS) OR create a new keyword');
    cy.wait(waitTime);

    // Causes the aria dropdown to be populated and displayed so that selection can be made.
    cy.get('[doi-subject] div[role="button"]').click( { force: true } );
    cy.wait(waitTime);
    // Makes the selection from the dropdown.
    cy.get('input.ember-power-select-search-input').type('Optics{enter}', { force: true });
    cy.wait(waitTime);

    cy.get('button#doi-create').click( { force: true } );
    cy.wait(waitTime);

    cy.get('div').contains('DOI created');
  });

  it('visiting the form and adding contributor', () => {
    cy.visit('/repositories/datacite.test/dois/new');
    cy.url().should('include', '/repositories/datacite.test/dois/new');
    cy.wait(waitTime);

    cy.get('#add-contributor').click( { force: true } );
    cy.wait(waitTime);

    // Causes the aria dropdown to be populated and displayed so that selection can be made.
    cy.get('[doi-contributor] div[role="button"]').click( { force: true } );
    cy.wait(waitTime);
    // Makes the selection from the dropdown.
    cy.get("ul.ember-power-select-options li").contains("Data collector").click( { force: true } );
    cy.wait(waitTime);

    cy.get('#toggle-contributors').should('be.visible').click({ force: true });
    cy.wait(waitTime);

    cy.get('#toggle-contributors').contains('Show 1 contributor');
    cy.wait(waitTime);

    cy.get('button#doi-create').click( { force: true } );
    cy.wait(waitTime);

    cy.get('div').contains('DOI created');
  });

  it('visiting the form and adding version', () => {
    cy.visit('/repositories/datacite.test/dois/new');
    cy.url().should('include', '/repositories/datacite.test/dois/new');
    cy.wait(waitTime);

    cy.get('#version-field').should('be.visible').type('67', { force: true });
    cy.wait(waitTime);

    cy.get('button#doi-create').click();
    cy.wait(waitTime);

    cy.get('div').should('contain', 'DOI created');
    cy.get('div.metadata').contains('Version 67');
  });

  it('visiting the form and adding format', () => {
    cy.visit('/repositories/datacite.test/dois/new');
    cy.url().should('include', '/repositories/datacite.test/dois/new');
    cy.wait(waitTime);

    cy.get('#add-format').click( { force: true } );
    cy.wait(waitTime);

    cy.get('[data-test-format]').should('be.visible').type('json', { force: true });
    cy.wait(waitTime);

    cy.get('#toggle-formats').should('be.visible').click({ force: true });
    cy.wait(waitTime);

    cy.get('#toggle-formats').contains('Show 1 format');
    cy.wait(waitTime);

    cy.get('button#doi-create').click();
    cy.wait(waitTime);

    cy.get('div').should('contain', 'DOI created');
  });

  it('visiting the form and adding size', () => {
    cy.visit('/repositories/datacite.test/dois/new');
    cy.url().should('include', '/repositories/datacite.test/dois/new');
    cy.wait(waitTime);

    cy.get('#add-size').click( { force: true } );
    cy.wait(waitTime);

    cy.get('[data-test-size]').should('be.visible').type('5kb', { force: true });
    cy.wait(waitTime);

    cy.get('#toggle-sizes').should('be.visible').click({ force: true });
    cy.wait(waitTime);

    cy.get('#toggle-sizes').contains('Show 1 size');
    cy.wait(waitTime);

    cy.get('button#doi-create').click();
    cy.wait(waitTime);

    cy.get('div').should('contain', 'DOI created');
  });

  it('visiting the form and adding alternate identfier', () => {
    cy.visit('/repositories/datacite.test/dois/new');
    cy.url().should('include', '/repositories/datacite.test/dois/new');
    cy.wait(waitTime);

    cy.get('#add-alternate-identifier').click( { force: true } );
    cy.wait(waitTime);

    // Causes the aria dropdown to be populated and displayed so that selection can be made.
    cy.get('[data-test-alternate-identifier-type] div[role="button"]').click( { force: true } );
    cy.wait(waitTime);
    // Makes the selection from the dropdown.
    cy.get("ul.ember-power-select-options li").contains("DOI").click( { force: true } );
    cy.wait(waitTime);

    cy.get('#toggle-alternate-identifiers').should('be.visible').click({ force: true });
    cy.wait(waitTime);

    cy.get('#toggle-alternate-identifiers').contains('Show 1 alternate identifier');
    cy.wait(waitTime);

    cy.get('button#doi-create').click( { force: true } );
    cy.wait(waitTime);

    cy.get('div').contains('DOI created');
  });

  it('update draft doi', () => {
    cy.visit('/dois/10.80225%2F9fxk-aa96/edit');
    cy.url().should('include', '/dois/10.80225%2F9fxk-aa96/edit');
    cy.wait(waitTime);

    cy.get('input#url-field').should('be.visible').clear().type('https://support.datacite.org/docs/doi-states', { force: true });
    cy.wait(waitTime);

    cy.get('button#doi-update').click( { force: true } );
    cy.wait(waitTime);

    cy.url().should('include', '/dois/10.80225%2F9fxk-aa96');
    cy.get('div.url a').contains('https://support.datacite.org/docs/doi-states');
  });

  it('create draft doi', () => {
    cy.visit('/repositories/datacite.test/dois/new');
    cy.url().should('include', '/repositories/datacite.test/dois/new');
    cy.wait(waitTime);

    // Causes the aria dropdown to be populated and displayed so that selection can be made.
    cy.get('#prefix-field div[role="button"]').click( { force: true } );
    cy.wait(waitTime);
    // Makes the selection from the dropdown.
    cy.get("ul.ember-power-select-options li").contains("10.80225").click( { force: true } );
    //cy.get('input.ember-power-select-search-input').type('References{enter}', { force: true });

    cy.get('input#suffix-field').should('be.visible').clear().type('2pwf-ry89', { force: true });
    cy.wait(waitTime);

    cy.get('button#doi-create').click();
    cy.wait(waitTime);

    cy.get('div').should('contain', 'DOI created');
    cy.url().should('include', '/dois/10.80225%2F2pwf-ry89');
    cy.get('h2.work').should('contain', '10.80225/2pwf-ry89');
  });

  it('delete draft doi', () => {
    cy.visit('/dois/10.80225%2F2pwf-ry89/delete');
    cy.url().should('include', '/dois/10.80225%2F2pwf-ry89/delete');
    cy.wait(waitTime);

    cy.get('input#confirm-doi-field').should('be.visible').type('10.80225/2pwf-ry89', { force: true });
    cy.wait(waitTime);

    cy.get('button#delete-doi').click();
    cy.wait(waitTime);

    cy.url().should('include', '/repositories/datacite.test/dois');
    cy.get('h2.work').should('contain', 'DataCite Test Repository');
  });

  it('visiting the form and adding related identifier', () => {
    cy.visit('/repositories/datacite.test/dois/new');
    cy.url().should('include', '/repositories/datacite.test/dois/new');
    cy.wait(waitTime);

    cy.get('#add-related-identifier').click( { force: true } );
    cy.wait(waitTime);

    cy.get('[data-test-related-identifier]').should('be.visible').type('10.70048/rph240519', { force: true });
    cy.wait(waitTime);

    // Causes the aria dropdown to be populated and displayed so that selection can be made.
    cy.get('[data-test-related-relation-type] div[role="button"]').click( { force: true } );
    cy.wait(waitTime);
    // Makes the selection from the dropdown.
    //cy.get("ul.ember-power-select-options li").contains("References").click( { force: true } );
    cy.get('input.ember-power-select-search-input').type('References{enter}', { force: true });

    cy.wait(waitTime);

    // Causes the aria dropdown to be populated and displayed so that selection can be made.
    cy.get('[data-test-related-resource-type] div[role="button"]').click( { force: true } );
    cy.wait(waitTime);
    // Makes the selection from the dropdown.
    cy.get("ul.ember-power-select-options li").contains("Text").click( { force: true } );
    cy.wait(waitTime);

    cy.get('[data-test-related-identifier-type] .ember-power-select-selected-item').contains('DOI');

    cy.get('#toggle-related-identifiers').should('be.visible').click({ force: true });
    cy.wait(waitTime);

    cy.get('#toggle-related-identifiers').contains('Show 1 related identifier');
    cy.wait(waitTime);

    cy.get('button#doi-create').click( { force: true } );
    cy.wait(waitTime);

    cy.get('div').contains('DOI created');
  });

  it.only('visiting the Form and adding funding references', () => {
    cy.visit('/repositories/datacite.test/dois/new');
    cy.url().should('include', '/repositories/datacite.test/dois/new');
    cy.wait(waitTime);

    cy.get('#add-funding-reference').click( { force: true } );
    cy.wait(waitTime);

    // Causes the aria dropdown to be populated and displayed so that selection can be made.
    cy.get('[data-test-funder-name] div[role="button"]').click( { force: true } );
    cy.wait(waitTime);
    // The aria dropdown does a search in this case is dynamically populated as the user types in
    // the search box. We must type enough here to make sure our option comes up in the search box.
    // Then we click the selection.
    cy.get('input.ember-power-select-search-input').type('Action for', { force: true } );
    cy.wait(waitTime);
    cy.get("ul.ember-power-select-options li").contains("Action for M.E.").click( { force: true } );
    cy.wait(waitTime);

    // Test a successful choice of an option in this list, in this case the choice is: 'Action for M.E.',
    // A successful choice causes autofilling of a couple of fields
    // with values associated with the choice.
    // Autofilled fields are also disabled, which limits our abiilty to test.

    // An autofilled field.  TO DO: there should be a way to test that the autofilled
    // value is valid. Not sure what that is.  We can test that the field is disabled, but
    // if you search the document, the field value is nowhere to be found.  Then how is it displayed?
    cy.get('[data-test-funder-identifier]').should('be.disabled')
    cy.wait(waitTime);

    // An autofilled field.  Because this is an aria-disabled element (not disabled) we can do more.
    // We can test for aria-disabled, then test the autofilled, 'selected' item.
    cy.get('[data-test-funder-identifier-type] div[role="button"]')
      .within(($obj) => {
        cy.wrap($obj).should('have.attr', 'aria-disabled');
        cy.wrap($obj).get('.ember-power-select-selected-item').contains('Crossref Funder ID');
      });
    cy.wait(waitTime);

    cy.get('[data-test-award-number]').should('be.visible').type('G2342342', { force: true });
    cy.wait(waitTime);

    cy.get('[data-test-award-uri]').should('be.visible').type('https://schema.datacite.org/meta/kernel-4', { force: true });
    cy.wait(waitTime);

    cy.get('button#doi-create').click( { force: true } );
    cy.wait(waitTime);

    cy.get('div').contains('DOI created');
  });

  it('visiting the form and adding rights', () => {
    cy.visit('/repositories/datacite.test/dois/new');
    cy.url().should('include', '/repositories/datacite.test/dois/new');
    cy.wait(waitTime);

    cy.get('#add-rights').click( { force: true } );
    cy.wait(waitTime);

    // Causes the aria dropdown to be populated and displayed so that selection can be made.
    cy.get('[data-test-rights] div[role="button"]').click( { force: true } );
    cy.wait(waitTime);
    // Makes the selection from the dropdown.
    cy.get("ul.ember-power-select-options li").contains("Attribution Assurance License").click( { force: true } );
    //cy.get('input.ember-power-select-search-input').type('References{enter}', { force: true });
    cy.wait(waitTime);

    cy.get('[data-test-rights-uri]').should('be.visible').type('http://spdx.org/licenses/AA.json', { force: true });
    cy.wait(waitTime);

    cy.get('#toggle-rights').should('be.visible').click({ force: true });
    cy.wait(waitTime);

    cy.get('#toggle-rights').contains('Show 1 right');
    cy.wait(waitTime);

    cy.get('button#doi-create').click( { force: true } );
    cy.wait(waitTime);

    cy.get('div').contains('DOI created');
  });

});