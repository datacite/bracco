import Ember from 'ember';

export default Ember.Component.extend({
  delete: null,
  clientPrefix: null,

  actions: {
    delete: function(clientPrefix) {
      this.set('clientPrefix', clientPrefix);
      this.set('delete', true);
    },
    cancel: function() {
      this.set('delete', false);
    },
    destroy: function() {
      this.get('clientPrefix').destroyRecord();
      this.get('clientPrefix').save();
      this.get('router').transitionTo('clients.show.prefixes', this.get('clientPrefix').get('client'));
    },
  }
});
