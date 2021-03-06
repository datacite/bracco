import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  actions: {
    submit() {
      let self = this;
      let providerId = this.model.get('provider.id');
      this.store
        .findRecord('contact', this.model.get('id'), {
          backgroundReload: false
        })
        .then(function (contact) {
          contact
            .destroyRecord()
            .then(function () {
              // We need a timeout because of ElasticSearch indexing
              setTimeout(() => {
                self.transitionToRoute('providers.show.contacts', providerId);
              }, 1200);
            })
            .catch(function (reason) {
              console.debug(reason);
            });
        });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.model.set('confirmDelete', null);
      this.transitionToRoute('contacts.show', this.model);
    }
  }
});
