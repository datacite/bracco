import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

export default Controller.extend({
  store: service(),

  actions: {
    submit(contact) {
      let self = this;

      contact
        .save()
        .then(function (contact) {
          self.transitionToRoute('contacts.show', contact.id);
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      this.model.contact.rollbackAttributes();
      this.transitionToRoute(
        'providers.show.contacts',
        this.get('model.provider.id')
      );
    }
  }
});