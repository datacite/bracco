import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  edit: false,
  delete: false,
  client: null,
  isDeletable: false,

  setIsDeletable() {
    console.log(this.get('client').get('prefixes'))
    this.set('isDeletable', Ember.isBlank(this.get('client').get('prefixes')));
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
      this.set('edit', false);
    },
    destroy: function(link) {
      console.log(link)
      this.get('client').destroyRecord();
      this.set('edit', false);
      this.get('router').transitionTo(link);
    },
    cancel: function() {
      this.set('edit', false);
      this.set('delete', false);
    }
  }
});
