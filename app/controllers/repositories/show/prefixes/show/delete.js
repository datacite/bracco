import Controller from '@ember/controller';

export default Controller.extend({

  actions: {
    submit() {
      let self = this;
      this.store.findRecord("clientPrefix", this.model.get('id'), { backgroundReload: false }).then(function(clientPrefix) {
        clientPrefix.destroyRecord().then(function () {
          self.transitionToRoute('repositories.show.prefixes', self.model.get('client.id'));
        });
      });
    },
    cancel() {
      this.transitionToRoute('repositories.show.prefixes', this.model.get('client.id'));
    },
  }
});
