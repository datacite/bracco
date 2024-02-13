import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),

  actions: {
    submit() {
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
              self.router.transitionToRoute('providers.show.prefixes', providerId);
            }, 1200);
          });
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      this.router.transitionToRoute(
        'providers.show.prefixes',
        this.model.get('provider.id')
      );
    }
  }
});
