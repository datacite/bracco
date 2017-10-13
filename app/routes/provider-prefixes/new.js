import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {

  model(params) {
    if (params['provider-id']) {
      return Ember.RSVP.hash({
        provider: this.store.findRecord('provider', params['provider-id']),
      });
    }
  }
});
