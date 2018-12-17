import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  perPage: 25,

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "totalPages" };

    params = Ember.merge(params, { 'client-id': this.modelFor('clients/show').get('id') });

    return Ember.RSVP.hash({
      client: this.modelFor('clients/show'),
      dois: this.findPaged('doi', params)
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
