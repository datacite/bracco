import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: Ember.inject.service(),

  canWrite: function() {
    return (['staff_admin', 'member_admin'].includes(this.get('currentUser.role')));
  }.property('currentUser.uid', 'user', 'canWrite'),
  canRead: function() {
    return (['staff_admin', 'member_admin'].includes(this.get('currentUser.role')));
  }.property('currentUser.uid', 'user', 'canRead'),
  canList: function() {
    return (['staff_admin', 'member_admin'].includes(this.get('currentUser.role')));
  }.property('currentUser.uid', 'user', 'canList')
});
