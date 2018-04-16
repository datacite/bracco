import Ember from 'ember';
import Component from '@ember/component';
const { service } = Ember.inject;

export default Component.extend({
  store: Ember.inject.service(),

  prefixesAvailable: false,

  didInsertElement() {
    this._super(...arguments);

    let providerId = this.get('model.client.id').split('.').get('firstObject');
    let self = this;
    this.get('store').query('prefix', { 'provider-id': providerId, state: 'without-client' }).then(function(availablePrefixes) {
      self.set('prefixesAvailable', availablePrefixes.get('meta').total > 0);
    });
  },
});