import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),
  store: service(),

  actions: {
    submit(contact) {
      let self = this;
      let provider = contact.get('provider');
      contact
        .save()
        .then(function () {
          return new Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve();
            }, 2000);
          });
        })
        .then(function () {
          self.transitionToRoute('providers.show.contacts', provider);
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.transitionToRoute(
        'providers.show.contacts',
        this.model.get('provider')
      );
    }
  }
});
