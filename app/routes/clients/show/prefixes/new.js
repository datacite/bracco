import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {

  model() {
    return Ember.RSVP.hash({
      client: this.store.findRecord('client', this.modelFor('clients/show').get('id')),
      prefix: this.store.createRecord('client-prefix', { client: this.modelFor('clients/show').get('id') })
    });
  },

  afterModel() {
    if (!this.can('create prefix', this.modelFor('clients/show'))) {
      return this.transitionTo('index');
    }
  }
});
