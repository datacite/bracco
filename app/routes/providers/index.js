import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  flashMessages: Ember.inject.service(),

  perPage: 25,

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };

    params = Ember.merge(params, { sort: 'name' });
    let providers = this.findPaged('provider', params);
    return providers;
    // let self = this;
    // let providers = this.findPaged('provider', params).then(function(providers) {
    //   console.log(providers)
    //   return providers;
    // }).catch(function(reason){
    //   Ember.Logger.assert(false, reason);
    //   self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
    //   return self.transitionTo('/');
    // });
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
