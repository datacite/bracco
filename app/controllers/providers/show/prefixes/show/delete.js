import Controller from '@ember/controller';

export default Controller.extend({

  actions: {
    submit() {
      let self = this;
      let providerId = this.model.get('provider.id');
      this.store.findRecord('providerPrefix', this.model.get('id'), { backgroundReload: false }).then(function(providerPrefix) {
        providerPrefix.destroyRecord().then(function() {
          self.transitionToRoute('providers.show.prefixes', providerId);
        });
      }).catch(function(reason) {
        console.debug(reason);
      });
    },
    cancel() {
      this.transitionToRoute('providers.show.prefixes', this.get('model.provider'));
    },
  },
});
