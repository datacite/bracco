import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: Ember.inject.service('current-user'),
  canWrite: Ember.computed(function() {
    this.get('currentUser').get('isAdmin');
  })
});
