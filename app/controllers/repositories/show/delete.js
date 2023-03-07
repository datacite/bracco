import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  actions: {
    submit() {
      let self = this;
      let providerId = this.model.get('provider.id');
      this.store.findRecord('repository', this.model.get('id'), { backgroundReload: false }).then(function(repository) {
        repository.destroyRecord().then(function() {
          self.transitionToRoute('providers.show.repositories', providerId);
        }).catch(function(reason) {
          console.debug(reason);
          self
          .get('flashMessages')
          .danger(
            'An error occurred while deleting this repository.  Please contact support.'
          );
        });
      });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.transitionToRoute('repositories.show', this.model);
    },
  },
});
