import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {

  model(params) {
    let client = this.modelFor('clients/show');

    return Ember.RSVP.hash({
      client: this.store.findRecord('client', client.id),
      prefix: this.store.createRecord('client-prefix', { client: client })
    });
  }
});
