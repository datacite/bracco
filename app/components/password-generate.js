import Ember from 'ember';
import Component from '@ember/component';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    this.get('model').set('password', null);
  },

  generate() {
    let self = this;
    let url = ENV.USER_API_URL + '/random';
    fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + this.get('currentUser').get('jwt')
      }
    }).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          self.get('model').set('password', data.phrase);
        });
      } else {
        Ember.Logger.assert(false, response)
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error)
    });
  },

  actions: {
    generate() {
      this.generate();
    },
    onSuccess() {
    },
    onError(error) {
      Ember.Logger.assert(false, error)
    }
  }
});
