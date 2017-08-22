import Ember from 'ember';

export default Ember.Route.extend({
  currentUser: Ember.inject.service(),

  model(params) {
    // filter users by member or data center
    let include = { include: 'member,data-center' };
    let role = this.get('currentUser').get('role');
    if (role === "member_admin") {
      include = { include: 'data-center' };
    } else if (role === "data_center_admin") {
      include = { include: 'member' };
    }

    return this.store.findRecord('work', params.work_id, include);
  },

  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
