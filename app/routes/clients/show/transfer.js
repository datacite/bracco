import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  model() {
    return this.store.findRecord('client', this.modelFor('clients/show').get('id'), { include: 'provider,repository' });
  }
});
