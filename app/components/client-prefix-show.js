import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  delete: null,
  client: null,
  clientPrefix: null,

  actions: {
    delete: function(clientPrefix) {
      this.set('clientPrefix', clientPrefix);
      this.set('client', clientPrefix.get('client'));
      this.set('delete', true);
    },
    cancel: function() {
      this.set('delete', false);
    },
    destroy: function() {
      let self = this;
      this.get('store').findRecord("clientPrefix", this.get('clientPrefix').get('id'), { backgroundReload: false }).then(function(clientPrefix) {
        clientPrefix.destroyRecord();
        self.get('router').transitionTo('clients.show.prefixes', self.get('client'));
      });
    },
  }
});
