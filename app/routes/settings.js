import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {

  model() {
    let self = this;
    this.store.findRecord('provider', 'admin').then(function(admin) {
      return admin;
    }).catch(function(reason){
      let error = reason.errors[0];

      if (error.title === "Adapter Error") {
        self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a problem with the DataCite Admin API. We apologize for the inconvenience and we are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.', {
          timeout: 5000,
          sticky: true
        });
      }
    });
  },

  afterModel() {
    if (!this.can('read index')) {
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
