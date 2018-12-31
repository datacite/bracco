import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, RouteMixin, {
  flashMessages: service(),

  perPage: 25,

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "totalPages" };

    let providers = this.findPaged('provider', params);
    return providers;
    // let self = this;
    // let providers = this.findPaged('provider', params).then(function(providers) {
    //   return providers;
    // }).catch(function(reason){
    //   Ember.Logger.assert(false, reason);
    //   self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
    //   return self.transitionTo('/');
    // });
  },

  afterModel() {
    if (!this.can('read index')) {
      return this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
