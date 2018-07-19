import Ember from 'ember';
const { service } = Ember.inject;
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

export default Ember.Controller.extend({
  session: service(),
  currentUser: service(),

  actions: {
    submit(user) {
      let self = this;
      user.save().then(function() {
        self.get('session').invalidate();
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    cancel() {
      let self = this;
      this.get('session').invalidate().then(function() {
        self.transitionTo('index');
      });
    },
    generate() {
      let self = this;
      let url = ENV.API_URL + '/random';
      fetch(url, {
        headers: {
          'Authorization': 'Bearer ' + this.get('currentUser').get('jwt')
        }
      }).then(function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            self.get('model').set('passwordInput', data.phrase);
          });
        } else {
          Ember.Logger.assert(false, response)
        }
      }).catch(function(error) {
        Ember.Logger.assert(false, error)
      });
    },
  }
});
