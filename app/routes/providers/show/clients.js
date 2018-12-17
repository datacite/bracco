import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  perPage: 25,

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "totalPages" };

    params = Ember.merge(params, { 'provider-id': this.modelFor('providers/show').get('id') });

    return Ember.RSVP.hash({
      provider: this.modelFor('providers/show'),
      clients: this.findPaged('client', params)
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
