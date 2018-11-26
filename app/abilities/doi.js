import Ember from 'ember';
const { service } = Ember.inject;
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: service(),

  canViewHealth: Ember.computed('currentUser.role_id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }),
  canSource: Ember.computed('currentUser.role_id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }),
  canTransfer: Ember.computed('currentUser.role_id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'provider_admin':
        return true;
      default:
        return false;
    }
  }),
  canUpdate: Ember.computed('currentUser.role_id', 'model.id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'provider_admin':
        return true;
      case 'client_admin':
        return this.get('currentUser.client_id') === this.get('model.id');
      default:
        return false;
    }
  }),
  canUpload: Ember.computed('currentUser.role_id', 'currentUser.client_id', 'model.otherParams.client-id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'client_admin':
        return this.get('currentUser.client_id') === this.get('model.otherParams.client-id');
      default:
        return false;
    }
  }),
  canCreate: Ember.computed('currentUser.role_id', 'currentUser.client_id', 'model.otherParams.client-id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'client_admin':
        return this.get('currentUser.client_id') === this.get('model.otherParams.client-id');
      default:
        return false;
    }
  }),
  canDelete: Ember.computed('currentUser.role_id', 'model.client.id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'client_admin':
        return this.get('currentUser.client_id') === this.get('model.client.id');
      default:
        return false;
    }
  }),
  canModify: Ember.computed('currentUser.role_id', 'currentUser.client_id', 'model.client.id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'client_admin':
        return this.get('currentUser.client_id') === this.get('model.client.id');
      default:
        return false;
    }
  }),
  canEdit: Ember.computed('currentUser.role_id', 'currentUser.client_id', 'model.client.id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'client_admin':
        return this.get('currentUser.client_id') === this.get('model.client.id');
      default:
        return false;
    }
  }),
  canForm: Ember.computed('currentUser.role_id', 'currentUser.client_id', 'model.client.id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'client_admin':
        return this.get('currentUser.client_id') === 'demo.datacite' && this.get('currentUser.client_id') === this.get('model.client.id');
      default:
        return false;
    }
  }),
  canRead: Ember.computed('currentUser.role_id', 'currentUser.provider_id', 'currentUser.client_id', 'model.client.id', 'model.provider.id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'provider_admin':
        return this.get('currentUser.provider_id') === this.get('model.provider.id');
      case 'client_admin':
        return this.get('currentUser.client_id') === this.get('model.client.id');
      default:
        return false;
    }
  })
});
