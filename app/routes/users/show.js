import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  model(params) {
    let self = this;
    return this.store.findRecord('user', params.user_id, { include: 'provider,client,role,sandbox' }).then(function(user) {
      return user;
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('/');
    });
  },

  afterModel(model) {
    if (!this.can('read user', model)) {
      //let home = (this.get('currentUser.id')) ? this.get('currentUser').get('home') : '/';
      return this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
