import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  provider: null,
  new: false,

  actions: {
    new: function() {
      this.set('provider', this.get('store').createRecord('provider'));
      this.set('new', true);
    },
    submit: function(provider) {
      provider.save();
      this.set('new', false);
    },
    cancel: function() {
      this.set('new', false);
    }
  }
});
