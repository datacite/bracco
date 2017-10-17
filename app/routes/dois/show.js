import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  home: '/',

  model(params) {
    return this.store.findRecord('doi', params.doi_id, { include: 'provider,client' });
  },

  // afterModel(model, transition) {
  //   if (!this.can('read work', model)) {
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
