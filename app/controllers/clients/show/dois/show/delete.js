import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  client: null,

  actions: {
    destroy() {
      this.set('client', this.model.get('client'));
      let self = this;
      this.store.findRecord("doi", this.model.get('id'), { backgroundReload: false }).then(function(doi) {
        doi.destroyRecord().then(function () {
          self.transitionToRoute('clients.show.dois', self.get('client'));
        });
      });
    },
    cancel() {
      this.transitionToRoute('clients.show.dois.show', this.model.get('client.id'), this.model);
    }
  }
});