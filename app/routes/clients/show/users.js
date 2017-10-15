import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import ENV from 'bracco/config/environment';

export default Ember.Route.extend(RouteMixin, {
  perPage: 25,

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };

    let client = this.modelFor('clients/show');
    if (client.get('isSandbox')) {
      params = Ember.merge(params, { 'sandbox-id': client.id });
    } else {
      params = Ember.merge(params, { 'client-id': client.id });
    }
    return this.findPaged('user', params);
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
