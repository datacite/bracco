import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  delete: null,
  provider: null,
  providerPrefix: null,

  actions: {
    delete(providerPrefix) {
      this.set('providerPrefix', providerPrefix);
      this.set('provider', providerPrefix.get('provider'));
      this.set('delete', true);
    },
    cancel() {
      this.set('delete', false);
    },
    destroy() {
      let self = this;
      this.get('store').findRecord("providerPrefix", this.get('providerPrefix').get('id'), { backgroundReload: false }).then(function(providerPrefix) {
        providerPrefix.destroyRecord().then(function () {
          self.get('router').transitionTo('providers.show.prefixes', self.get('provider'));
        });
      });
    }
  }
});
