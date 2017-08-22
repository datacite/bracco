import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  currentUser: Ember.inject.service(),

  model() {
    let currentUser = this.get('currentUser');

    if (currentUser.get('role') === "member_admin") {
      return this.store.findRecord('member', currentUser.get('member_id'));
    } else if (currentUser.get('role') === "data_center_admin") {
      return this.store.findRecord('data-center', currentUser.get('data_center_id'), { include: 'member' });
    } else {
      return null;
    }
  }
});
