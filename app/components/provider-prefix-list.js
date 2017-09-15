import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  new: false,
  providerPrefix: null,
  provider: null,
  prefix: null,
  prefixes: [],

  actions: {
    new: function(model) {
      this.set('provider', this.get('store').findRecord('provider', model.content.query['provider-id']));
      this.set('prefixes', this.get('store').query('prefix', { state: 'unassigned', 'page[size]': 10 }));
      //this.set('prefix', this.get('prefixes').get('firstObject'));
      this.set('new', true);
    },
    submit: function() {
      this.set('providerPrefix', this.get('store').createRecord('providerPrefix', { provider: this.get('provider'), prefix: this.get('prefix') }));
      this.get('providerPrefix').save();
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
