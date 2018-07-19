import Ember from 'ember';
const { service } = Ember.inject;
import BaseValidator from 'ember-cp-validations/validators/base';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

const validUrl = BaseValidator.extend({
  currentUser: service(),

  validate(value, options) {
    const { allowBlank } = options;

    if (allowBlank && Ember.isEmpty(value)) {
      return true;
    }

    let url = ENV.API_URL + '/dois/status?url=' + value;
    return fetch(url, {
      method: 'post',
      timeout: 5000,
      headers: {
        'Authorization': 'Bearer ' + this.get('currentUser').get('jwt')
      }
    }).then(function(response) {
      if (response.ok) {
        return response.json().then(function(result) {
          if (parseInt(result.status) === 403) {
            return "Access to page was forbidden (status code " + result.status + ").";
          } else if (result.status === 404) {
            return "Page was not found (status code " + result.status + ").";
          } else if (result.status === 408) {
            return "Request timed out reaching the page (status code " + result.status + ").";
          } else if (result.status !== 200) {
            return true; //"An unknown error has occured (status code " + result.status + ") and will be investigated.";
          } else if (result['content-type'] !== "text/html") {
            return "Page should be a web page, but was content type " + result['content-type'] + ".";
          } else {
            return true;
          }
        });
      } else {
        Ember.Logger.assert(false, response)
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error)
    });
  }
});

validUrl.reopenClass({
  getDependentsFor() {
    return ['url'];
  }
});

export default validUrl;
