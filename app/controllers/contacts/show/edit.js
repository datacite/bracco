import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),
  store: service(),

  actions: {
    submit(contact) {
      let self = this;
      contact
        .save()
        .then(function (con) {
          self.transitionToRoute('contacts.show', con);
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.transitionToRoute('contacts.show', this.model);
    }
  }
});
