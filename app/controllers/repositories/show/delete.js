import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  actions: {
    submit() {
      let self = this;
      this.store.findRecord('repository', this.repository.get('id'), { backgroundReload: false }).then(function(repository) {
        repository.destroyRecord().then(function() {
          self.transitionToRoute('repositories');
        }).catch(function(reason) {
          console.debug(reason);
        });
      });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.transitionToRoute('repositories.show.settings', this.model);
    },
  },
});
