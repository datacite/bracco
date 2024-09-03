import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

@classic
export default class DeleteController extends Controller {
  @service
  store;

  @service
  router;

  @service
  flashMessages;

  @action
  submitAction() {
    let self = this;
    let providerId = this.model.get('provider.id');
    this.store
      .findRecord('repository', this.model.get('id'), {
        backgroundReload: false
      })
      .then(function (repository) {
        repository
          .destroyRecord()
          .then(function () {
            self.router.transitionTo(
              'providers.show.repositories',
              providerId
            );
          })
          .catch(function (reason) {
            console.debug(reason);
            self
              .get('flashMessages')
              .danger(
                'An error occurred while deleting this repository.  Please contact support.'
              );
          });
      });
  }

  @action
  cancelAction() {
    this.model.rollbackAttributes();
    this.router.transitionTo('repositories.show', this.model);
  }
}
