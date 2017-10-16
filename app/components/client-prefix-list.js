import Ember from 'ember';
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  availablePrefixes: [],

  didInsertElement() {
    this._super(...arguments);

    let providerId = this.get('model.otherParams.client-id').split('.').get('firstObject');
    if (providerId !== 'sandbox') {
      this.set('availablePrefixes', this.get('store').query('prefix', { 'provider-id': this.get('model.otherParams.client-id').split('.').get('firstObject'), state: 'without-client', sort: 'name', 'page[size]': 10 }));
    }
  },
});
