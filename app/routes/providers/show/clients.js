import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  perPage: 25,

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };

    // params = Ember.merge(params, { adapterOptions: { include: ['member'] }});
    params = Ember.merge(params, { 'provider-id': this.modelFor('providers/show').get('id') });
    return this.findPaged('client', params);
  },

  afterModel() {
    if (!this.can('read provider', this.modelFor('providers/show'))) {
      let home = (this.get('currentUser.id')) ? this.get('currentUser').get('home') : '/';
      return this.transitionTo(home);
    }
  },

  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    },
    refreshCurrentRoute(){
      this.refresh();
    }
  }
});
