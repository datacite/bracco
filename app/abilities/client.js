import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  canDelete: Ember.computed('currentUser', function() {
    switch(this.get('currentUser.role')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }),
  canWrite: Ember.computed('currentUser.role', 'currentUser.provider_id', 'currentUser.data_center_id', 'model.id', 'model.provider.id', function() {
    switch(this.get('currentUser.role')) {
      case 'staff_admin':
        return this.get('currentUser.provider_id') === this.get('model.provider');
      case 'provider_admin':
        return true;
      case 'client_admin':
        return this.get('currentUser.client_id') === this.get('model.id');
      default:
        return false;
    }
  }),
  canRead: Ember.computed('currentUser.role', 'currentUser.provider_id', 'currentUser.data_center_id', 'model.id', 'model.provider.id', function() {
    switch(this.get('currentUser.role')) {
      case 'staff_admin':
        return true;
      case 'provider_admin':
        return this.get('currentUser.provider_id') === this.get('model.provider.id');
      case 'client_admin':
        return this.get('currentUser.client_id') === this.get('model.id');
      default:
        return false;
    }
  })
});
