import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),
  store: service(),

  actions: {
    submit() {
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
    },
    cancel() {
      this.router.transitionTo(
        'repositories.show.prefixes',
        this.model.get('repository.id')
      );
    }
  }
});
