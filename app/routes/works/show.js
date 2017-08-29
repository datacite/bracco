import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  perPage: 25,
  home: '/',

  model(params) {
    return this.store.findRecord('work', params.work_id, { include: 'member,data-center' });
  },

  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
