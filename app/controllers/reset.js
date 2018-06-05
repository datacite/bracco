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
      let url = ENV.APP_URL + '/reset';
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'username=' + identification
      }).then(function(response) {
        if (response.ok) {
          self.set('requestSent', true);
        } else {
          self.set('errorMessage', response.statusText);
        }
      }).catch(function(reason) {
        self.set('errorMessage', reason.errors && reason.errors[0].title || JSON.stringify(reason));
      });
    }
  }
});
