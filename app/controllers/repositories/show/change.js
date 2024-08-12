import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

@classic
export default class ChangeController extends Controller {
  @service
  currentUser;

  @service
  router;

  @action
  togglePasswordAction() {
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password-input-field');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    togglePassword.classList.toggle('bi-eye');
  }

  @action
  toggleConfirmPasswordAction() {
    const togglePassword = document.querySelector('#toggleConfirmPassword');
    const password = document.querySelector('#confirm-password-input-field');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    togglePassword.classList.toggle('bi-eye');
  }

  @action
  generateAction() {
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
  }

  @action
  submitAction(repository) {
    let self = this;
    repository
      .save()
      .then(function (repository) {
        var controller = self;
        controller.get('model').set('passwordInput', '');
        controller.get('model').set('confirmPasswordInput', '');
        return repository;
      })
      .then(function (repository) {
        self.router.transitionTo('repositories.show', repository);
      })
      .catch(function (reason) {
        console.debug(reason);
      });
  }

  @action
  cancelAction() {
    let controller = this;
    controller.get('model').set('passwordInput', '');
    controller.get('model').set('confirmPasswordInput', '');
    this.model.rollbackAttributes();
    this.router.transitionTo('repositories.show', this.model);
  }
}
