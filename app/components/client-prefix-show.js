import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  delete: null,
  client: null,
  clientPrefix: null,

  actions: {
    delete(clientPrefix) {
      this.set('clientPrefix', clientPrefix);
      this.set('client', clientPrefix.get('client'));
      this.set('delete', true);
    },
    cancel() {
      this.set('delete', false);
    },
    destroy() {
      let self = this;
      this.get('store').findRecord("clientPrefix", this.get('clientPrefix').get('id'), { backgroundReload: false }).then(function(clientPrefix) {
        clientPrefix.destroyRecord().then(function () {
          self.get('router').transitionTo('clients.show.prefixes', self.get('client'));
        });
      });
    },
  }
});
