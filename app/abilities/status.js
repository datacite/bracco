import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: Ember.inject.service(),
  canWrite: Ember.computed(function() {
    this.get('currentUser').get('isAdmin');
  })
});
