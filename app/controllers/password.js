import Ember from 'ember';
const { service } = Ember.inject;
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

export default Ember.Controller.extend({
  session: service(),
  currentUser: service(),
  identification: null,
  password: null,

  authenticate() {
    if (this.get('session.isAuthenticated')) {
      this.get('session').invalidate();
    }
    this.get('session').authenticate('authenticator:oauth2', this.get("identification"), this.get("password")).catch((reason) => {
      this.set('errorMessage', reason.errors && reason.errors[0].title || reason);
    });
  },

  actions: {
    submit(user) {
      this.set("identification", user.id);
      this.set("password", user.get("passwordInput"));

      let self = this;
      user.save().then(function() {
        self.authenticate();
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
      let url = ENV.APP_URL + '/random';
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
