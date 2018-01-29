import Ember from 'ember';
const { service } = Ember.inject;
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: service(),

  canWrite: Ember.computed(function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }),
  canRead: Ember.computed(function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  })
});
