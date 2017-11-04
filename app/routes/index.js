import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  flashMessages: Ember.inject.service(),

  model() {
    let self = this;
    this.store.findRecord('provider', 'admin').then(function(admin) {
      return admin;
    }).catch(function(reason){
      let error = reason.errors[0];
      console.assert(false, error);

      if (error.title === "Adapter Error") {
        self.get('flashMessages').warning('There is a problem with the DataCite API. Please try again later or contact DataCite Support.', {
          timeout: 5000,
          sticky: true
        });
      }
    });
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
