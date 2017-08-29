import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({  
  canWrite: Ember.computed('currentUser.role', function() {
    switch(this.get('currentUser.role')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }),
  canRead: Ember.computed('currentUser.role', 'currentUser.member_id', 'currentUser.data_center_id', 'model.id', 'model.member.id', function() {
    switch(this.get('currentUser.role')) {
      case 'staff_admin':
        return true;
      case 'member_admin':
        return this.get('currentUser.member_id') === this.get('model.member.id');
      case 'data_center_admin':
        return this.get('currentUser.data_center_id') === this.get('model.id');
      default:
        return false;
    }
  })
});
