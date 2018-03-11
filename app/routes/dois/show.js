import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  model(params) {
    let self = this;
    return this.store.findRecord('doi', params.doi_id, { include: 'provider,client' }).then(function(doi) {
      return doi;
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('/');
    });
  },

  afterModel(model) {
    if (!this.can('read doi', model)) {
      return this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
