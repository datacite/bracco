import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  edit: false,
  provider: null,

  actions: {
    edit(provider) {
      this.set('provider', provider);
      this.set('edit', true);
    },
    submit() {
      this.get('provider').save();
      this.set('edit', false);
    },
    cancel() {
      this.set('edit', false);
    }
  }
});
