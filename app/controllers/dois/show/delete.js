import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),
  router: service(),

  repositoryId: null,

  actions: {
    destroy() {
      let self = this;
      let repositoryId = this.model.get('repository.id');
      this.store.findRecord('doi', this.model.get('id'), { backgroundReload: false }).then(function(doi) {
        doi.destroyRecord().then(function() {
          self.router.transitionToRoute('repositories.show.dois', repositoryId);
        });
      }).catch(function(reason) {
        console.debug(reason);
      });
    },
    cancel() {
      this.router.transitionToRoute('dois.show', this.model);
    },
  },
});