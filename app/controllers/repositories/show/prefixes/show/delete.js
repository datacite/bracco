import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    submit() {
      let self = this;
      let repositoryId = this.model.get('repository.id');
      this.store
        .findRecord('repositoryPrefix', this.model.get('id'), {
          backgroundReload: false
        })
        .then(function (repositoryPrefix) {
          repositoryPrefix.destroyRecord().then(function () {
            // We need a timeout because of ElasticSearch indexing
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
        this.model.get('repository.id')
      );
    }
  }
});
