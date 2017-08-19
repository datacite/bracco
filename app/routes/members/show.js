import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  beforeModel: function() {
    if (!this.can('list member')) {
      this.transitionTo('index');
    }
  },

  model(params) {
    return this.store.findRecord('member', params.member_id);
  },
  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
