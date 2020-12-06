import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  repositoryId: null,

  actions: {
    destroy() {
      let self = this;
      let repositoryId = this.model.repository.id;
      this.store
        .findRecord('doi', this.model.id, { backgroundReload: false })
        .then(function (doi) {
          doi.destroyRecord().then(function () {
            self.transitionToRoute('repositories.show.dois', repositoryId);
          });
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      this.transitionToRoute('dois.show', this.model);
    }
  }
});
