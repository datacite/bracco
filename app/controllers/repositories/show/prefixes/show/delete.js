import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    submit() {
      let self = this;
      let repositoryId = this.model.repository.id;
      this.store
        .findRecord('repositoryPrefix', this.model.id, {
          backgroundReload: false
        })
        .then(function (repositoryPrefix) {
          repositoryPrefix.destroyRecord().then(function () {
            setTimeout(() => {
              self.transitionToRoute(
                'repositories.show.prefixes',
                repositoryId
              );
            }, 1200);
          });
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      this.transitionToRoute(
        'repositories.show.prefixes',
        this.model.repository.id
      );
    }
  }
});
