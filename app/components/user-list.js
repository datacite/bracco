import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  availableUsers: [],

  didInsertElement: function() {
    if (this.get('model.otherParams.sandbox-id')) {
      this.set('availableUsers', this.get('store').query('user', { sandbox: true, exclude: true, sort: 'name', 'page[size]': 25 }));
    } else if (this.get('model.otherParams.provider-id') === 'sandbox') {
      this.set('availableUsers', []);
    } else if (this.get('model.otherParams.client-id')) {
      this.set('availableUsers', this.get('store').query('user', { 'client-id': this.get('model.otherParams.client-id'), exclude: true, sort: 'name', 'page[size]': 25 }));
    } else if (this.get('model.otherParams.provider-id')) {
      this.set('availableUsers', this.get('store').query('user', { 'provider-id': this.get('model.otherParams.provider-id'), exclude: true, sort: 'name', 'page[size]': 25 }));
    } else {
      this.set('availableUsers', this.get('store').query('user', { sort: 'name', 'page[size]': 10 }));
    }
  }
});
