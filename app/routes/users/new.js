import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  model(params) {
    if (params['client-id']) {
      return Ember.RSVP.hash({
        provider: this.store.findRecord('provider', params['client-id'].split('.').get('firstObject')),
        client: this.store.findRecord('client', params['client-id'])
      });
    } else if (params['provider-id']) {
      return Ember.RSVP.hash({
        provider: this.store.findRecord('provider', params['provider-id']),
      });
    }
  }
});
