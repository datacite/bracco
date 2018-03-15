import Ember from 'ember';
const { service } = Ember.inject;
import BaseValidator from 'ember-cp-validations/validators/base';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

const metadata = BaseValidator.extend({
  currentUser: service(),

  validate(value, options) {
    if (!value && options.allowBlank) {
      return true;
    } else {
      let url = ENV.APP_URL + '/dois/validate';
      return fetch(url, {
        method: 'post',
        headers: {
          'authorization': 'Bearer ' + this.get('currentUser').get('jwt'),
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            type: 'dois',
            attributes: {
              doi: this.get(options.dependentKeys[0]),
              xml: btoa(value)
            },
            relationships: {
              client: {
                data: {
                  type: "clients",
                  id: this.get('currentUser').get('client_id')
                }
              }
            }
          }
        })
      }).then(function(response) {
        if (response.ok) {
          return response.json().then(function(data) {
            if (data.errors) {
              let message = data.errors[0].source.capitalize() + ': ' + data.errors[0].title;
              return message;
            } else {
              return true;
            }
          });
        } else {
          Ember.Logger.assert(false, response);
        }
      }).catch(function(error) {
        Ember.Logger.assert(false, error);
      });
    }
  }
});

metadata.reopenClass({
  getDependentsFor() {
    return ['xml'];
  }
});

export default metadata;
