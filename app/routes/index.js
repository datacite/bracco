import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {

  model() {
    return this.store.findRecord('provider', 'admin');
  },
  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
