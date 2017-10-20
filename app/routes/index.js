import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {

  model() {
    return this.store.findRecord('provider', 'admin');
  },

  afterModel() {
    if (!this.can('read index') && this.get('currentUser')) {
      let home = this.get('currentUser').get('home');
      return this.transitionTo(home);
    }
  },

  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
