import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

export default Controller.extend({
  currentUser: service(),
  router: service(),

  actions: {
    togglePassword() {
      const togglePassword = document.querySelector('#togglePassword');
      const password = document.querySelector('#password-input-field');
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      togglePassword.classList.toggle('bi-eye');
    },
    toggleConfirmPassword() {
      const togglePassword = document.querySelector('#toggleConfirmPassword');
      const password = document.querySelector('#confirm-password-input-field');
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      togglePassword.classList.toggle('bi-eye');
    },
    generate() {
      let self = this;
      let url = ENV.API_URL + '/random';
      fetch(url, {
        headers: {
          Authorization: 'Bearer ' + this.currentUser.get('jwt')
        }
      })
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              self.get('model').set('passwordInput', data.phrase);
            });
          } else {
            console.debug(response);
          }
        })
        .catch(function (error) {
          console.debug(error);
        });
    },
    submit(provider) {
      let self = this;
      provider
        .save()
        .then(function (provider) {
          var controller = self;
          controller.get('model').set('passwordInput', '');
          controller.get('model').set('confirmPasswordInput', '');
          return provider;
        })
        .then(function () {
          self.router.transitionTo('index');
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      let controller = this;
      controller.get('model').set('passwordInput', '');
      controller.get('model').set('confirmPasswordInput', '');
      this.model.rollbackAttributes();
      this.router.transitionTo('index');
    }
  }
});
