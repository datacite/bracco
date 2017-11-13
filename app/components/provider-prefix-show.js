import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  delete: null,
  provider: null,
  providerPrefix: null,

  actions: {
    delete: function(providerPrefix) {
      this.set('providerPrefix', providerPrefix);
      this.set('provider', providerPrefix.get('provider'));
      this.set('delete', true);
    },
    cancel: function() {
      this.set('delete', false);
    },
    destroy: function() {
      let self = this;
      this.get('store').findRecord("providerPrefix", this.get('providerPrefix').get('id'), { backgroundReload: false }).then(function(providerPrefix) {
        providerPrefix.destroyRecord();
        self.get('router').transitionTo('providers.show.prefixes', self.get('provider'));
      });
    },
  }
});
