import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),
  store: service(),
  router: service(),
  flashMessages: service(),

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
      this.model.rollbackAttributes();
      this.router.transitionTo('contacts.show', this.model);
    }
  }
});
