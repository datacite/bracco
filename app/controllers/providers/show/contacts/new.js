import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

export default Controller.extend({
  store: service(),

  actions: {
    submit(contact) {
      let self = this;
      let provider = contact.get('provider');
      contact
        .save()
        .then(function () {
          return new Promise(function(resolve, reject) { 
            setTimeout(function () {
              resolve();
            }, 2000)
          });
        })
        .then(function (contact) {
          self.transitionToRoute('providers.show.contacts', provider);
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
