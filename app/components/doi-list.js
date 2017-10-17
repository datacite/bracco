import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  new: false,
  edit: false,
  doi: null,
  provider: null,
  target: null,
  client: null,
  clients: [],

  searchClient(query) {
    if (this.get('currentUser').get('isAdmin')) {
      this.set('clients', this.get('store').query('client', { 'query': query, sort: 'name', 'page[size]': 25 }));
    } else if (this.get('currentUser').get('isProvider')) {
      this.set('clients', this.get('store').query('client', { 'query': query, 'provider-id': this.get('currentUser').get('providerId'), sort: 'name', 'page[size]': 25 }));
    }
  },
  selectTarget(target) {
    this.set('target', target)
    this.get('client').set('target', target);
  },
  reset() {
    this.set('client', null);
    this.set('edit', false);
    this.set('new', false);
  },

  actions: {
    new: function() {
      this.set('doi', this.get('store').createRecord('doi'));
      this.set('new', true);
    },
    edit: function() {
      this.set('client', this.get('store').findRecord('client', this.get('model.otherParams.client-id')));
      this.searchClient(null);
      this.set('edit', true);
    },
    searchClient(query) {
      this.searchClient(query);
    },
    selectTarget(target) {
      this.selectTarget(target);
    },
    update() {
      this.get('client').save();
      this.set('edit', false);
      this.get('router').transitionTo('clients.show.dois', this.get('target'));
    },
    submit: function(doi) {
      doi.save();
      this.set('new', false);
    },
    cancel: function() {
      this.reset();
    }
  }
});
