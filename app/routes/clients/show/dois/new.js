import Ember from 'ember';
const { service } = Ember.inject;
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  flashMessages: service(),
  store: service(),

  model() {
    let self = this;
    return this.store.createRecord('doi', { client: params['client-id'], prefix: '10.5072', state: 'draft' }).then(function(doi) {
      return doi;
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('/');
    });
  },

  afterModel(model) {
    if (!this.can('create doi', model)) {
      return this.transitionTo('index');
    }
  }
});
