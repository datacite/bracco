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
              self.transitionToRoute('providers.show.contacts', providerId);
            })
            .catch(function (reason) {
              console.debug(reason);
            });
        });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.model.set('confirmName', null);
      this.transitionToRoute('contacts.show', this.model);
    }
  }
});
