import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  edit: false,
  client: null,

  actions: {
    edit: function(client) {
      this.set('client', client);
      this.set('edit', true);
    },
    submit: function() {
      this.get('client').save();
      this.set('edit', false);
    },
    cancel: function() {
      this.set('edit', false);
    }
  }
});
