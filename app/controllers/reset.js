import Ember from 'ember';
import fetch from 'fetch';
const { service } = Ember.inject;
import ENV from 'bracco/config/environment';

export default Ember.Controller.extend({
  session: service(),

  requestSent: false,
  errorMessage: null,

  actions: {
    sendLink() {
      this.set('requestSent', false);
      let { identification } = this.getProperties('identification');
      let self = this;
      let url = ENV.API_URL + '/reset';
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'username=' + identification
      }).then(function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            if (data.message === 'Queued. Thank you.') {
              self.set('requestSent', true);
            } else {
              self.set('errorMessage', data.message);
            }
          });
        } else {
          Ember.Logger.assert(false, response)
        }
      }).catch(function(reason) {
        self.set('errorMessage', reason.errors && reason.errors[0].title || JSON.stringify(reason));
      });
    }
  }
});
