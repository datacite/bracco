import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('data-center', params.data_center_id, { include: 'member' });
  },

  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
