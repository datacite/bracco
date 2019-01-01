import { hash } from 'rsvp';
import { assign } from '@ember/polyfills';
import Route from '@ember/routing/route';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, RouteMixin, {
  perPage: 25,

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "totalPages" };

    params = assign(params, { 'client-id': this.modelFor('clients/show').get('id'), reload: true });

    return hash({
      client: this.modelFor('clients/show'),
      prefixes: this.findPaged('client-prefix', params)
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
    },
    refreshCurrentRoute(){
      this.refresh();
    }
  }
});
