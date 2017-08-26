import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  canDelete: Ember.computed(function() {
    switch(this.get('currentUser.role')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }),
  canWrite: Ember.computed(function() {
    switch(this.get('currentUser.role')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }),
  canRead: Ember.computed('model', function() {
    switch(this.get('currentUser.role')) {
      case 'staff_admin':
        return true;
      case 'member_admin':
      case 'data_center_admin':
        return this.get('currentUser').get('member_id') === this.get('model.id');
      default:
        return false;
    }
  })
});
