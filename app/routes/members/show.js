import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('member', params.member_id);
  },
  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
