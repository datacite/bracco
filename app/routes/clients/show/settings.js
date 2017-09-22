import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  model(params) {
    return this.store.findRecord('client', this.modelFor('clients/show').get('id'), { include: 'provider' });
  },

  // afterModel(model, transition) {
  //   if (!this.can('read data-center', model)) {
  //     let home = this.get('currentUser').get('home');
  //     this.transitionTo(home);
  //   }
  // },

  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
