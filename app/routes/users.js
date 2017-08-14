import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(RouteMixin, CanMixin, {
  perPage: 25,

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };
    return this.findPaged('user', params);
  },
  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
