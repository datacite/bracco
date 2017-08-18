import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  currentUser: Ember.inject.service(),
  
  perPage: 25,

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };

    // only show member works if member
    if (this.get('currentUser').get('role') === "member_admin") {
      params = Ember.merge(params, { 'member-id': this.get('currentUser').get('member_id') });
    } else if (this.get('currentUser').get('role') === "data_center_admin") {
      params = Ember.merge(params, { 'data-center-id': this.get('currentUser').get('data_center_id') });
    }

    return this.findPaged('work', params);
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
      this.transitionTo({ queryParams: params });
    }
  }
});
