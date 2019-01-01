import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

export default Controller.extend({
  session: service(),
  currentUser: service(),

  actions: {
    submit(user) {
      let self = this;
      user.save().then(function() {
        self.get('session').invalidate();
      }).catch(function(reason){
        if (console.debug) {
          console.debug(reason);
        } else {
          console.log(reason);
        }
      });
    },
    cancel() {
      let self = this;
      this.session.invalidate().then(function() {
        self.transitionTo('index');
      });
    },
    generate() {
      let self = this;
      let url = ENV.API_URL + '/random';
      fetch(url, {
        headers: {
          'Authorization': 'Bearer ' + this.currentUser.get('jwt')
        }
      }).then(function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            self.get('model').set('passwordInput', data.phrase);
          });
        } else {
          if (console.debug) {
            console.debug(response);
          } else {
            console.log(response);
          }
        }
      }).catch(function(error) {
        if (console.debug) {
          console.debug(error);
        } else {
          console.log(error);
        }
      });
    },
  }
});
