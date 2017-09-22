import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  perPage: 25,
  home: '/',

  beforeModel() {
    let result = this._super(...arguments);

    if (!this.can('read index')) {
      let home = this.get('currentUser').get('home');
      return this.transitionTo(home);
    }

    return result;
  },

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };

    return this.findPaged('prefix', params);
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
