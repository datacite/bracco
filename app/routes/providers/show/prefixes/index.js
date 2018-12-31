import { hash } from 'rsvp';
import { merge } from '@ember/polyfills';
import Route from '@ember/routing/route';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, RouteMixin, {
  perPage: 25,

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "totalPages" };

    params = merge(params, { 'provider-id': this.modelFor('providers/show').get('id') });

    return hash({
      provider: this.modelFor('providers/show'),
      prefixes: this.findPaged('provider-prefix', params)
    });
  },

  afterModel() {
    if (!this.can('read provider', this.modelFor('providers/show'))) {
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
