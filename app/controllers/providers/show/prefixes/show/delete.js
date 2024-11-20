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
    let providerId = this.model.get('provider.id');
    this.store
      .findRecord('providerPrefix', this.model.get('id'), {
        backgroundReload: false
      })
      .then(function (providerPrefix) {
        providerPrefix.destroyRecord().then(function () {
          // We need a timeout because of ElasticSearch indexing
          setTimeout(() => {
            self.router.transitionTo('providers.show.prefixes', providerId);
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
      'providers.show.prefixes',
      this.model.get('provider.id')
    );
  }
}
