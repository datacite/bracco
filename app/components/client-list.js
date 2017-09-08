import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  client: null,
  new: false,

  actions: {
    new: function(client, provider) {
      console.log(provider)
      this.set('client', this.get('store').createRecord('client'));
      this.set('new', true);
    },
    submit: function(client) {
      client.save();
      this.set('new', false);
    },
    cancel: function() {
      this.set('new', false);
    }
  }
});
