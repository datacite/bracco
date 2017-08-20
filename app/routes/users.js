import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  currentUser: Ember.inject.service(),


  
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
    }
  }
});
