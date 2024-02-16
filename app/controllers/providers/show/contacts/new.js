import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),
  router: service(),

  actions: {
    submit(contact) {
      let self = this;
      contact
        .save()
        .then(function (c) {
          self.router.transitionTo('contacts.show', c);
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      this.router.transitionTo('providers.show.contacts', this.model.provider);
    }
  }
});
