import Controller from '@ember/controller';

export default Controller.extend({

  actions: {
    submit() {
      let self = this;
      this.store.findRecord('repositoryPrefix', this.model.get('id'), { backgroundReload: false }).then(function(repositoryPrefix) {
        repositoryPrefix.destroyRecord().then(function() {
          self.transitionToRoute('repositories.show.prefixes', self.model.get('repository.id'));
        });
      });
    },
    cancel() {
      this.transitionToRoute('repositories.show.prefixes', this.model.get('repository.id'));
    },
  },
});
