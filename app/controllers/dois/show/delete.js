import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  repositoryId: null,

  actions: {
    destroy() {
      this.set('repositoryId', this.model.get('repository.id'));
      let self = this;
      this.store.findRecord('doi', this.model.get('id'), { backgroundReload: false }).then(function(doi) {
        doi.destroyRecord().then(function() {
          self.transitionToRoute('repositories.show.dois', self.get('repositoryId'));
        });
      }).catch(function(reason) {
        console.debug(reason);
      });
    },
    cancel() {
      this.transitionToRoute('dois.show', this.model);
    },
  },
});