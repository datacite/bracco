import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  client: null,
  new: false,

  actions: {
    new: function(client) {
      this.set('client', client);
      this.set('new', true);
    },
    submit: function(client) {
      //client.createRecord('post',
      this.set('new', false);
    },
    cancel: function() {
      this.set('new', false);
    }
  }
});
