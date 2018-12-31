import Controller from '@ember/controller';

export default Controller.extend({

  actions: {
    submit() {
      let self = this;
      this.store.findRecord("clientPrefix", this.model.get('id'), { backgroundReload: false }).then(function(clientPrefix) {
        clientPrefix.destroyRecord().then(function () {
          self.transitionToRoute('clients.show.prefixes', self.get('model.client'));
        });
      });
    },
    cancel() {
      this.transitionToRoute('clients.show.prefixes', this.get('model.client'));
    },
  }
});
