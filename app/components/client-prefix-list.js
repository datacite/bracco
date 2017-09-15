import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  new: false,
  client: null,
  clientPrefix: null,
  prefix: null,
  prefixes: [],

  actions: {
    new: function(model) {
      this.set('client', this.get('store').findRecord('client', model.content.query['client-id']));
      this.set('prefixes', this.get('store').query('prefix', { 'page[size]': 10 }));
      //this.set('prefix', this.get('prefixes').get('firstObject'));
      this.set('new', true);
    },
    submit: function() {
      this.set('clientPrefix', this.get('store').createRecord('clientPrefix', { client: this.get('client'), prefix: this.get('prefix') }));
      this.get('clientPrefix').save();
      this.set('new', false);
    },
    selectPrefix: function(prefix) {
      this.set('prefix', prefix);
    },
    cancel: function() {
      this.set('new', false);
    }
  }
});
