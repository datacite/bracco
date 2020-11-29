import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  actions: {
    submit() {
      let self = this;
      this.store
        .findRecord('provider', this.model.get('id'), {
          backgroundReload: false
        })
        .then(function (provider) {
          provider
            .destroyRecord()
            .then(function () {
              self.transitionToRoute('providers');
            })
            .catch(function (reason) {
              console.debug(reason);
            });
        });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.transitionToRoute('providers.show', this.model);
    }
  }
});
