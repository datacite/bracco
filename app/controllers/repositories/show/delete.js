import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  actions: {
    submit() {
      let self = this;
      let providerId = this.model.provider.id;
      this.store
        .findRecord('repository', this.model.id, {
          backgroundReload: false
        })
        .then(function (repository) {
          repository
            .destroyRecord()
            .then(function () {
              self.transitionToRoute('providers.show.repositories', providerId);
            })
            .catch(function (reason) {
              console.debug(reason);
            });
        });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.transitionToRoute('repositories.show', this.model);
    }
  }
});
