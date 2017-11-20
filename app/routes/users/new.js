import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  model(params) {
    if (params['client-id']) {
      return Ember.RSVP.hash({
        provider: this.store.findRecord('provider', params['client-id'].split('.').get('firstObject')),
        client: this.store.findRecord('client', params['client-id'])
      });
    } else if (params['provider-id']) {
      return Ember.RSVP.hash({
        provider: this.store.findRecord('provider', params['provider-id']),
        client: null
      });
    } else {
      return Ember.RSVP.hash({
        provider: null,
        client: null
      });
    }
  }
});
