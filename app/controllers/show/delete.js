import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  repository: null,

  actions: {
    destroy() {
      this.set('repository', this.model.get('repository'));
      let self = this;
      this.store.findRecord("doi", this.model.get('id'), { backgroundReload: false }).then(function(doi) {
        doi.destroyRecord().then(function () {
          self.transitionToRoute('repositories.show.dois', self.get('repository.id'));
        });
      });
    },
    cancel() {
      this.transitionToRoute('repositories.show.dois.show', this.model.get('repository.id'), this.model);
    }
  }
});