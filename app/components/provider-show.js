import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  edit: false,
  delete: false,
  provider: null,
  isDeletable: false,

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('isDeletable', Ember.isBlank(this.get('model').get('dois')));
  },

  reset() {
    this.set('provider', null);
    this.set('edit', false);
  },

  actions: {
    edit: function(provider) {
      this.set('provider', provider);
      this.set('edit', true);
    },
    delete: function(client) {
      this.set('provider', client);
      this.set('delete', true);
    },
    submit: function() {
      this.get('provider').save();
      this.reset();
    },
    destroy: function() {
      this.get('provider').destroyRecord();
      this.set('edit', false);
      this.get('router').transitionTo('providers');
    },
    cancel: function() {
      this.reset();
    }
  }
});
