import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store: service(),

  prefixesAvailable: false,

  didInsertElement() {
    this._super(...arguments);

    let providerId = (this.get('model.client.id') || this.get('model.repository.id')).split('.').get('firstObject');
    let self = this;
    this.store.query('prefix', { 'provider-id': providerId, state: 'without-client' }).then(function(availablePrefixes) {
      self.set('prefixesAvailable', availablePrefixes.get('meta').total > 0);
    });
  },
});