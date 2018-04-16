import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {

  model() {
    let provider = this.modelFor('providers/show');

    return Ember.RSVP.hash({
      provider: this.store.findRecord('provider', provider.get('id')),
      prefix: this.store.createRecord('provider-prefix', { provider: provider })
    });
  }
});

