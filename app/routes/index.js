import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  flashMessages: Ember.inject.service(),

  model() {
    let self = this;
    return this.store.findRecord('provider', 'admin').then(function(admin) {
      return admin;
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
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
