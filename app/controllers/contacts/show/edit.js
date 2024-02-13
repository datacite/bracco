import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),
  store: service(),
  router: service(),

  actions: {
    submit(contact) {
      let self = this;
      contact
        .save()
        .then(function (c) {
          self.router.transitionToRoute('contacts.show', c);
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.router.transitionToRoute('contacts.show', this.model);
    }
  }
});
