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
        .then(function (c) {
          self.transitionToRoute(
            'providers.show.contacts',
            c.provider.get('id')
          );
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.transitionToRoute(
        'providers.show.contacts',
        this.model.get('provider.id')
      );
    }
  }
});
