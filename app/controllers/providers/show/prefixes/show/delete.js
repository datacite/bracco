import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    submit() {
      let self = this;
      this.get('store').findRecord("providerPrefix", this.get('model').get('id'), { backgroundReload: false }).then(function(providerPrefix) {
        providerPrefix.destroyRecord().then(function () {
          self.transitionToRoute('providers.show.prefixes', self.get('model.provider'));
        });
      });
    },
    cancel() {
      this.transitionToRoute('providers.show.prefixes', this.get('model.provider'));
    },
  }
});
