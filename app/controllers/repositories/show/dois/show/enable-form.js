import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  actions: {
    enable(doi) {
      let self = this;
      doi.set("source", "fabrica")
      doi.save().then(function (doi) {
        self.transitionToRoute('clients.show.dois.show', doi.get('client').get('id'), doi);
      });
    },
    cancel() {
      this.transitionToRoute('clients.show.dois.show', this.model.get('client').get('id'), this.model);
    }
  }
});
