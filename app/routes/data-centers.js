import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(RouteMixin, {
  // beforeModel: function() {
  //   if (!this.can('read member')) {
  //     this.transitionTo('index');
  //   }
  // },

  perPage: 25,

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };
    // params = Ember.merge(params, { adapterOptions: { include: ['member'] }});
    return this.findPaged('data-center', params);
  },
  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
