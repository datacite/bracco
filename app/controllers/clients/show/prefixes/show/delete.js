import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    submit() {
      let self = this;
      this.get('store').findRecord("clientPrefix", this.get('model').get('id'), { backgroundReload: false }).then(function(clientPrefix) {
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
