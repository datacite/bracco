/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {

    /**
     * Custom command to log in to the app.
     * @example cy.login(username, password)
     */
    login(username: string, password: string): Chainable<Element>;

    /**
     * Custom command to click body(0,0) to force DOM to resolve another action.
     * @example cy.clickOutside()
     */
    clickOutside(): Chainable<Element>;

    /**
     * Custom command to create a test contact.
     * @example cy.createContact(email, given_name, family_name, roles, type, id, api_url, jwt)
     */
    createContact(email: string, given_name: string, family_name: string, roles: Array<string>, type: string, id: string, api_url: string, jwt: string): Chainable<Element>;

    /**
     * Custom command to create a test doi.
     * @example cy.createDoi(prefix, api_url, jwt)
     */
    createDoi(prefix: string, api_url: string, jwt: string): Chainable<Element>;

    /**
     * Custom command to create a doi from a base64 encoded xml file (from fixtures).
     * @example cy.createDoiXmlUpload(prefix, fixture, api_url, jwt)
     */
    createDoiXmlUpload(prefix: string, fixture: string, api_url: string, jwt: string): Chainable<Element>;

    /**
     * Custom command to delete test contacts created as a result of a test run.
     * @example cy.deleteProviderTestContacts(provider_id, test_contact_family_name_prefix, Cypress.env('api_url'), cookie.value)
     */
    deleteProviderTestContacts(provider_id: string, test_contact_family_name_prefix: string, api_url: string, cookie_value: string): Chainable<Element>;

  }
}
