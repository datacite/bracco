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
      user
        .save()
        .then(function () {
          self.session.invalidate();
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      let self = this;
      this.session.invalidate().then(function () {
        self.transitionTo('index');
      });
    },
    generate() {
      let self = this;
      let url = ENV.API_URL + '/random';
      fetch(url, {
        headers: {
          Authorization: 'Bearer ' + this.currentUser.jwt
        }
      })
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              self.model.set('passwordInput', data.phrase);
            });
          } else {
            console.debug(response);
          }
        })
        .catch(function (error) {
          console.debug(error);
        });
    }
  }
});
