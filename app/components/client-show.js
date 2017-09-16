import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  edit: false,
  delete: false,
  client: null,
  isDeletable: false,

  setIsDeletable() {
    this.set('isDeletable', Ember.isBlank(this.get('client').get('prefixes')));
  },

  reset() {
    this.set('client', null);
    this.set('edit', false);
  },

  actions: {
    edit: function(client) {
      this.set('client', client);
      this.setIsDeletable();
      this.set('edit', true);
    },
    delete: function(client) {
      this.set('client', client);
      this.set('delete', true);
    },
    submit: function(client) {
      client.save();
      this.reset();
    },
    destroy: function(link) {
      this.get('client').destroyRecord();
      this.set('edit', false);
      this.get('router').transitionTo(link);
    },
    cancel: function() {
      this.reset();
      this.set('delete', false);
    }
  }
});
