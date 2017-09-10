import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  client: null,
  new: false,
  attach: false,
  detach: false,
  selectedPrefix: null,
  prefixes: [],

  actions: {
    new: function() {
      this.set('new', true);
    },
    attach: function(selectedPrefix) {
      this.set('attach', true);
    },
    detach: function(selectedPrefix) {
      this.set('detach', true);
    },
    submit: function(selectedPrefix, model) {
      console.log(selectedPrefix)
      //selectedPrefix.save();
      this.set('new', false);
    },
    cancel: function() {
      this.set('new', false);
      this.set('attach', false);
    },
    searchPrefix: function(query) {
      this.set('prefixes', this.get('store').query('prefix', { query: query, 'page[size]': 10 }));
    },
    selectPrefix(selectedPrefix) {
      this.set('selectedPrefix', selectedPrefix);
    },
  }
});
