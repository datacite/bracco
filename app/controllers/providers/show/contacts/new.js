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
        .then(function (c) {
          self.transitionToRoute('contacts.show', c);
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      this.model.contact.rollbackAttributes();
      this.transitionToRoute('contacts.show', this.model);
    }
  }
});
