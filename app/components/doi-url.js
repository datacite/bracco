import Ember from 'ember';
import fetch from 'fetch';
const { service } = Ember.inject;
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({
  currentUser: service(),

  url: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.fetchURL();
  },

  fetchURL() {
    let self = this;
    let url = ENV.API_URL + '/dois/' + this.get('model').get('doi') + '/get-url';

    fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + self.get('currentUser').get('jwt'),
        'Accept': 'application/vnd.api+json'
      }
    }).then(function(response) {
      if (response.ok) {
        return response.json().then(function(data) {
          if (data.errors) {
            let message = data.errors[0].title;
            return message;
          } else {
            self.set('url', data.url);
            self.get('model').set('url', data.url);
          }
        });
      } else {
        Ember.Logger.assert(false, response);
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error);
    });
  }
});
