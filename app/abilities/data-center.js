import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: Ember.inject.service(),

  canDelete: Ember.computed(function() {
    switch(this.get('currentUser.role')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }),
  canWrite: Ember.computed('model', function() {
    switch(this.get('currentUser.role')) {
      case 'staff_admin':
      case 'member_admin':
        return true;
      case 'data_center_admin':
        return this.get('currentUser').get('data_center_id') === this.get('model.id');
      default:
        return false;
    }
  }),
  canRead: Ember.computed('model', function() {
    switch(this.get('currentUser.role')) {
      case 'staff_admin':
      case 'member_admin':
        return true;
      case 'data_center_admin':
        return this.get('currentUser').get('data_center_id') === this.get('model.id');
      default:
        return false;
    }
  }),
  canList: Ember.computed(function() {
    switch(this.get('currentUser.role')) {
      case 'staff_admin':
      case 'member_admin':
        return true;
      default:
        return false;
    }
  })
});
