import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  flashMessages: Ember.inject.service(),

  model(params) {
    return this.store.findRecord('provider', params.provider_id);
  },

  // afterModel(model, transition) {
  //   let unassignedUserCount = this.get('store').query('user', { 'provider-id': model.id, 'role-id': 'user', sort: 'name', 'page[size]': 10 }).then(function(users) {
  //     console.log(users)
  //   });
  //
  //   this.get('flashMessages').success('There are unassigned users.', {
  //     timeout: 5000,
  //     sticky: true
  //   });
  // },

  afterModel(model) {
    if (!this.can('read provider', model)) {
      let home = (this.get('currentUser.id')) ? this.get('currentUser').get('home') : '/';
      return this.transitionTo(home);
    }
  },

  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
