import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  edit: false,
  delete: false,
  provider: null,
  isDeletable: false,

  setIsDeletable() {
    console.log(this.get('provider').get('prefixes'))
    this.set('isDeletable', Ember.isBlank(this.get('provider').get('prefixes')));
  },

  actions: {
    edit: function(provider) {
      this.set('provider', provider);
      this.setIsDeletable();
      this.set('edit', true);
    },
    delete: function(client) {
      this.set('provider', client);
      this.set('delete', true);
    },
    submit: function() {
      this.get('provider').save();
      this.set('edit', false);
    },
    destroy: function() {
      this.get('provider').destroyRecord();
      this.set('edit', false);
      this.get('router').transitionTo('providers');
    },
    cancel: function() {
      this.set('edit', false);
    }
  }
});
