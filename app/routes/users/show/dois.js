import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  perPage: 25,

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };

    params = Ember.merge(params, { 'person-id': this.modelFor('users/show').get('id') });
    return this.findPaged('doi', params);
  },

  afterModel() {
    if (!this.can('read user', this.modelFor('users/show'))) {
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
