import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  perPage: 25,

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };

    // filter users by member or data center
    let role = this.get('currentUser').get('role');
    if (role === "member_admin") {
      params = Ember.merge(params, { 'member-id': this.get('currentUser').get('member_id') });
    } else if (role === "data_center_admin") {
      params = Ember.merge(params, { 'data-center-id': this.get('currentUser').get('data_center_id') });
    }

    return this.findPaged('work', params);
  },
  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
