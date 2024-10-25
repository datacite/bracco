/* eslint-disable prettier/prettier */
/// <reference types="cypress" />

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
import 'cypress-file-upload';

function cookie(jwt, expires_in) {
  var future = new Date();

  var cookie = {
    authenticated: {
      authenticator: 'authenticator:oauth2',
      access_token: jwt,
      expires_in: expires_in,
      expires_at: future.setDate(future.getDate() + 30)
    }
  };

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
    }
  };

  cy.session(username, () => {
    cy.request(options).then(resp => {
      var jwt = resp.body.access_token;
      var expires_in = resp.body.expires_in;
      var my_cookie = cookie(jwt, expires_in);
      cy.setCookie('_fabrica', my_cookie);
      cy.setCookie('_jwt', jwt);
      // Maybe delete next line.
      //window.localStorage.setItem('authToken', resp.body.access_token)
    });
  },
  {
    //cacheAcrossSpecs: true,
  });
});

Cypress.Commands.add('isNotInViewport', (element) => {
  cy.get(element).should($el => {
    const bottom = Cypress.$(cy.state('window')).height()
    const rect = $el[0].getBoundingClientRect()

    expect(rect.top).to.be.greaterThan(bottom)
    expect(rect.bottom).to.be.greaterThan(bottom)
  })
})

Cypress.Commands.add('isInViewport', (element) => {
  cy.get(element).should($el => {
    const bottom = Cypress.$(cy.state('window')).height()
    const rect = $el[0].getBoundingClientRect()

    expect(rect.top).not.to.be.greaterThan(bottom)
    expect(rect.bottom).not.to.be.greaterThan(bottom)
  });
});

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
});

Cypress.Commands.add("createRegisteredDoi", (prefix, api_url, jwt) => {
  return cy.request({
    method: 'POST',
    url: api_url + '/dois',
    body: {
      'data': {
        'type': 'dois',
        'attributes': { 
          'prefix': prefix,
          "url": "https://example.com",
          "creators": [
              {
                  "name": "Minnie Mouse",
                  "givenName": null,
                  "familyName": null,
                  "nameType": null,
                  "nameIdentifiers": [],
                  "affiliation": []
              }
          ],
          "titles": [
              {
                  "title": "Test Title",
                  "titleType": null,
                  "lang": null
              }
          ],
          "publisher": {
              "name": "University of Illinois Urbana-Champaign",
              "lang": null,
              "publisherIdentifier": "https://ror.org/047426m28",
              "publisherIdentifierScheme": "ROR",
              "schemeUri": "https://ror.org"
          },
          "publicationYear": 2024,
          "subjects": [],
          "contributors": [],
          "alternateIdentifiers": [],
          "dates": [],
          "language": null,
          "types": {
              "resourceTypeGeneral": "Dataset"
          },
          "relatedIdentifiers": [],
          "sizes": [],
          "formats": [],
          "version": null,
          "rightsList": [],
          "descriptions": [],
          "geoLocations": [],
          "fundingReferences": [],
          "relatedItems": [],
          "xml": null,
          "schemaVersion": "http://datacite.org/schema/kernel-4",
          "source": "fabricaForm",
          "state": "registered",
          "reason": null,
          "event": "register",
          "mode": "new"        
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
});

Cypress.Commands.add("createRegisteredDoiXmlUpload", (prefix, fixture, api_url, jwt) => {

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
});

/*
Cypress.Commands.add('clickOutside', function(): Chainable<any> {
  return cy.get('body').click(0,0); //0,0 here are the x and y coordinates
});
*/

Cypress.Commands.add("clickOutside", () => {
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
});

Cypress.Commands.add("deleteProviderTestContacts", (provider, test_contact_family_name_prefix, api_url, jwt) => {
  return cy.request({
    method: 'GET',
    url: api_url + '/contacts?page[size]=1000&provider-id=' + provider + "&query=email:*" + test_contact_family_name_prefix + "*",
    headers: {
      authorization: 'Bearer ' + jwt,
    },
    failOnStatusCode: true,
  }).then((response) => {
    expect(response.status).to.eq(200)

    const deleteContactsByIds = async (contact_ids) => {
      const requests = contact_ids.map(contact_id =>
        cy.request({
          method: 'DELETE',
          url: api_url + '/contacts/' + contact_id,
          headers: {
            authorization: 'Bearer ' + jwt,
          },
          failOnStatusCode: false,
        })
      );
      const responses = await Promise.all(requests)
      return responses
    };

    const contacts = response.body.data
    const contact_ids = contacts.map(obj => obj.id)

    deleteContactsByIds(contact_ids).then(responses => {
      return responses
    });
  });
});