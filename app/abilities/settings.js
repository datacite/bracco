import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: Ember.inject.service(),

  canRead: function() {
    return (['staff_admin', 'member_admin'].includes(this.get('currentUser.role')));
  }.property('currentUser.uid', 'settings', 'canRead')
});
