import Route from '@ember/routing/route';
import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, {
  model() {
    let self = this;
    return this.store.findRecord('client', this.modelFor('clients/show').get('id'), { include: 'provider,repository' }).then(function(client) {
      return client;
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('/');
    });
  },

  afterModel() {
    if (!this.can('read client', this.modelFor('clients/show'))) {
      return this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
