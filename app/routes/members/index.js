import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  perPage: 25,

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };

    params = Ember.merge(params, { 'member-type': 'allocating' });
    return this.findPaged('member', params);
  },
  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
