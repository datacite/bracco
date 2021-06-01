// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// The following 2 commands that can be used to test if an object is within a viewport.
// https://github.com/cypress-io/cypress/issues/877

import 'cypress-wait-until';
import { copySync } from 'fs-extra';
import 'cypress-file-upload';

function cookie(jwt, expires_in) {
  var future = new Date();

  var cookie = {
    "authenticated": {
      "authenticator": "authenticator:oauth2",
      "access_token": jwt,
      "expires_in": expires_in,
      "expires_at": future.setDate(future.getDate() + 30)
    }
  }

  return encodeURIComponent(JSON.stringify(cookie));
}

Cypress.Commands.add('login', (username, password) => {
  const options = {
    method: 'POST',
    url: Cypress.env('api_url') + '/token',
    body: {
      grant_type: 'password',
      username: username,
      password: password,
    },
  };
  cy.request(options).then(resp => {
    var jwt = resp.body.access_token;
    var expires_in = resp.body.expires_in;
    var my_cookie = cookie(jwt, expires_in);
    cy.setCookie('_fabrica', my_cookie);
    cy.setCookie('_jwt', jwt);
  });
});

Cypress.Commands.add('isInViewport', { prevSubject: true },(subject) => {
  const bottom = Cypress.$(cy.state('window')).height();
  const rect = subject[0].getBoundingClientRect();

  expect(rect.top).not.to.be.greaterThan(bottom);
  expect(rect.bottom).not.to.be.greaterThan(bottom);

  return subject;
});

Cypress.Commands.add('isNotInViewport', { prevSubject: true },(subject) => {
  const bottom = Cypress.$(cy.state('window')).height()
  const rect = subject[0].getBoundingClientRect()

  expect(rect.top).to.be.greaterThan(bottom)
  expect(rect.bottom).to.be.greaterThan(bottom)

  return subject;
})

Cypress.Commands.add("createDoi", (prefix, api_url, jwt) => {
  return cy.request({
    method: 'POST',
    url: api_url + '/dois',
    body: {
      'data': {
        'type': 'dois',
        'attributes': { 'prefix': prefix }
      }
    },
    headers: {
      authorization: 'Bearer ' + jwt,
    }
  }).then((response) => {
    // redirect status code is 302
    expect(response.status).to.eq(201)
    return(response.body.data.id);
  });
})

Cypress.Commands.add("createDoiXmlUpload", (prefix, fixture, api_url, jwt) => {

  cy.readFile('cypress/fixtures/' + fixture, 'base64').then(text => {
    return cy.request({
      method: 'POST',
      url: api_url + '/dois',
      body: {
        'data': {
          'type': 'dois',
          'attributes': {
            'prefix': prefix,
            "url": "https://schema.datacite.org/meta/kernel-4.0/index.html",
            "xml": text,
          }
        }
      },
      headers: {
        authorization: 'Bearer ' + jwt,
      }
    }).then((response) => {
      // redirect status code is 302
      expect(response.status).to.eq(201)
      return(response.body.data.id);
    });
  });
})

Cypress.Commands.add('clickOutside', function(): Chainable<any> {
  return cy.get('body').click(0,0); //0,0 here are the x and y coordinates
});

Cypress.Commands.add("createContact", (email, given_name, family_name, roles, type, id, api_url, jwt) => {
  return cy.request({
    method: 'POST',
    url: api_url + '/contacts',
    body: {
      'data': {
        'attributes': {
          'email': email,
          'givenName': given_name,
          'familyName': family_name,
          'name': '',
          'roleName': roles,
        },
        "relationships": {
          "provider": {
            "data": {
              'type': type,
              'id': id
            }
          }
        },
        'type': 'contacts'
      }
    },
    headers: {
      authorization: 'Bearer ' + jwt,
    }
  }).then((response) => {
    // redirect status code is 302
    expect(response.status).to.eq(201)
    return(response.body.data.id);
  });
})
