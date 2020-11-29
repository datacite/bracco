import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

export default Controller.extend({
  currentUser: service(),

  actions: {
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
    submit(repository) {
      let self = this;
      repository.set('keepPassword', false);
      repository
        .save()
        .then(function (repository) {
          self.transitionToRoute('repositories.show', repository);
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.transitionToRoute('repositories.show', this.model);
    }
  }
});
