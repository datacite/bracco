import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(RouteMixin, CanMixin, {
  currentUser: Ember.inject.service(),
  
  beforeModel: function() {
    if (!this.can('list user')) {
      this.transitionTo('index');
    }
  },

  perPage: 25,

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };

    // only show member data centers if member
    if (this.get('currentUser').get('role') === "member_admin") {
      params = Ember.merge(params, { 'member-id': this.get('currentUser').get('member_id') });
    }

    return this.findPaged('user', params);
  },
  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    },
    doSearch(query) {
      let params = Object.assign(this.context.otherParams, { query: query });

      params.paramMapping = { page: "page[number]",
                              perPage: "page[size]",
                              total_pages: "total-pages" };

      // only show member data centers if member
      if (this.get('currentUser').get('role') === "member_admin") {
        params = Ember.merge(params, { 'member-id': this.get('currentUser').get('member_id') });
      }

      this.transitionTo({ queryParams: params });
    }
  }
});
