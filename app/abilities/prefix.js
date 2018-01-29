import Ember from 'ember';
const { service } = Ember.inject;
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: service(),

  canWrite: Ember.computed('currentUser.role_id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'provider_admin':
        return true;
      default:
        return false;
    }
  }),
  canUpdate: Ember.computed('currentUser.role_id', 'currentUser.provider_id', 'currentUser.client_id', 'model.clients', 'model.providers', function() {
    //let self = this;
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'provider_admin':
        return true;
        // return this.get('model.providers').any(function(provider, index, providers) {
        //   return provider.get('id') === self.get('currentUser.provider_id');
        // });
      default:
        return false;
    }
  }),
  canRead: Ember.computed('currentUser.role_id', 'currentUser.provider_id', 'currentUser.client_id', 'model.clients', 'model.providers', function() {
    let self = this;
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'provider_admin':
        return true;
        // return this.get('model.providers').any(function(provider, index, providers) {
        //   return provider.get('id') === self.get('currentUser.provider_id');
        // });
      case 'client_admin':
        return this.get('model.clients').any(function(client) {
          return client.get('id') === self.get('currentUser.client_id');
        });
      default:
        return false;
    }
  })
});
