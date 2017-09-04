import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  canWrite: function() {
    switch(this.get('currentUser.role')) {
      case 'provider_admin':
      case 'client_admin':
        return true;
      default:
        return false;
    }
  }.property('currentUser.uid', 'settings', 'canWrite'),
  canRead: function() {
    switch(this.get('currentUser.role')) {
      case 'provider_admin':
      case 'client_admin':
        return true;
      default:
        return false;
    }
  }.property('currentUser.uid', 'settings', 'canRead'),
});
