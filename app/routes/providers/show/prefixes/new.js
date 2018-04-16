import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {

  model() {
    return Ember.RSVP.hash({
      provider: this.store.findRecord('provider', this.modelFor('providers/show').get('id')),
      prefix: this.store.createRecord('provider-prefix', { provider: this.modelFor('providers/show').get('id') })
    });
  }
});

