import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: Ember.inject.service(),
  canWrite: Ember.computed('currentUser.isAdmin', function() {
    var role = this.get('currentUser').get('role');
    return (role === 'admin');
  })
});
