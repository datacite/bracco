import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  edit: false,
  provider: null,

  actions: {
    edit: function(provider) {
      this.set('provider', provider);
      this.set('edit', true);
    },
    submit: function() {
      this.get('provider').save();
      this.set('edit', false);
    },
    cancel: function() {
      this.set('edit', false);
    }
  }
});
