import Ember from 'ember';
const { service } = Ember.inject;
import BaseValidator from 'ember-cp-validations/validators/base';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

const metadata = BaseValidator.extend({
  currentUser: service(),

  validate(value) {
    let url = ENV.APP_URL + '/metadata/convert';
    return fetch(url, {
      method: 'post',
      headers: {
        'authorization': 'Bearer ' + this.get('currentUser').get('jwt'),
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          type: 'metadata',
          attributes: { xml: btoa(value) }
        }
      })
    }).then(function(response) {
      if (response.ok) {
        return true;
      } else {
        return response.json().then(function(data) {
          let message = data.errors.map(e => e.source.capitalize() + ': ' + e.title).join('\n');
          return message;
        });
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error)
    });
  }
});

metadata.reopenClass({
  getDependentsFor() {
    return ['xml'];
  }
});

export default metadata;
