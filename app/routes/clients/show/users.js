import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  perPage: 25,

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };

    let client = this.modelFor('clients/show');
    params = Ember.merge(params, { 'client-id': client.id });

    // if (client.get('isSandbox')) {
    //   params = Ember.merge(params, { 'sandbox-id': client.id });
    // } else {
    //   params = Ember.merge(params, { 'client-id': client.id });
    // }
    return this.findPaged('user', params);
  },

  afterModel() {
    if (!this.can('read client', this.modelFor('clients/show'))) {
      let home = (this.get('currentUser.id')) ? this.get('currentUser').get('home') : '/';
      return this.transitionTo(home);
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    },
    refreshCurrentRoute() {
      this.refresh();
    }
  }
});
