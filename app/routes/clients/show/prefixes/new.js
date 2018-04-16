import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {

  model(params) {

    return Ember.RSVP.hash({
      client: this.store.findRecord('client', params.client_id),
      prefix: this.store.createRecord('client-prefix', { client: params.client_id })
    });
  }
});
