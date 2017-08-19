import Ember from 'ember';

export default Ember.Route.extend({
  currentUser: Ember.inject.service(),

  model(params) {
    return this.store.findRecord('work', params.work_id, { include: 'member,data-center' });
  },

  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
