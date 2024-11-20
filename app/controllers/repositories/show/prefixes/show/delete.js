import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class DeleteController extends Controller {
  @service
  router;

  @service
  store;

  @action
  submitAction() {
    let self = this;
    let repositoryId = this.model.get('repository.id');
    this.store
      .findRecord('repositoryPrefix', this.model.get('id'), {
        backgroundReload: false
      })
      .then(function (repositoryPrefix) {
        repositoryPrefix.destroyRecord().then(function () {
          // We need a timeout because of ElasticSearch indexing
          setTimeout(() => {
            self.router.transitionTo(
              'repositories.show.prefixes',
              repositoryId
            );
          }, 1200);
        });
      })
      .catch(function (reason) {
        console.debug(reason);
      });
  }

  @action
  cancelAction() {
    this.router.transitionTo(
      'repositories.show.prefixes',
      this.model.get('repository.id')
    );
  }
}
