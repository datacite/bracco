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
          self.transitionToRoute('dois');
        });
      });
    },
    cancel() {
      this.transitionToRoute('dois.show', this.model);
    }
  }
});