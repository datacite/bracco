import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';
const { service } = Ember.inject;

export default Ember.Route.extend(CanMixin, RouteMixin, {
  currentUser: service(),
  flashMessages: service(),

  model() {
    let self = this;
    return this.store.findRecord('provider', 'admin').then(function(admin) {
      return admin;
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('index');
    });
  },

  afterModel() {
    if (!this.can('read index') && this.get('currentUser')) {
      let home = this.get('currentUser').get('home');
      if (Ember.typeOf(home) == 'object') {
        return this.transitionTo(home.route, home.id);
      } else if (home) {
        return this.transitionTo(home);
      } else {
        return this.transitionTo('index');
      }
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
