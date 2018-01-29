import Ember from 'ember';
const { service } = Ember.inject;
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: service(),
  
  canDelete: Ember.computed('currentUser.role_id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'provider_admin':
        return true;
      default:
        return false;
    }
  }),
  canCreate: Ember.computed('currentUser.role_id', 'currentUser.provider_id', 'currentUser.client_id', 'model.id', 'model.provider.id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true
      case 'provider_admin':
        return true;
      default:
        return false;
    }
  }),
  canUpdate: Ember.computed('currentUser.role_id', 'currentUser.provider_id', 'currentUser.client_id', 'model.id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'provider_admin':
        return this.get('currentUser.provider_id') === (this.get('model.id') && this.get('model.id').split('.').get('firstObject'));
      case 'client_admin':
        return this.get('currentUser.client_id') === this.get('model.id');
      default:
        return false
    }
  }),
  canRead: Ember.computed('currentUser.role_id', 'currentUser.provider_id', 'currentUser.client_id', 'model.id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'provider_admin':
        return this.get('currentUser.provider_id') === (this.get('model.id') && this.get('model.id').split('.').get('firstObject'));
      case 'client_admin':
      default:
        return this.get('currentUser.sandbox_id') === this.get('model.id');
    }
  })
});
