import Ember from 'ember';
const { service } = Ember.inject;
import BaseValidator from 'ember-cp-validations/validators/base';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

const Metadata = BaseValidator.extend({
  currentUser: service(),

  validate(value, options, model) {
    let url = ENV.APP_URL + '/metadata/validate';
    return fetch(url, {
      method: 'post',
      headers: {
        'authorization': 'Bearer ' + this.get('currentUser').get('jwt'),
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          type: 'metadata',
          attributes: { xml: btoa(value) },
          relationships: {
            doi: {
              data: {
                type: 'dois',
                id: model.get('doi')
              }
            }
          }
        }
      })
    }).then(function(response) {
      if (response.ok) {
        return true;
      } else {
        Ember.Logger.assert(false, response);
        let message = response
        return message;
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error)
      let message = error
      return message;
    });
  }
});

Metadata.reopenClass({
  getDependentsFor() {
    return ['xml'];
  }
});

export default Metadata;
