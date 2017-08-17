import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: Ember.inject.service(),

  canDelete: function() {
    return (this.get('currentUser.role') === 'staff_admin');
  }.property('currentUser.uid', 'member', 'canDelete'),
  canWrite: function() {
    return (this.get('currentUser.role') === 'staff_admin');
  }.property('currentUser.uid', 'member', 'canWrite'),
  canRead: function() {
    return (this.get('currentUser.role') === 'staff_admin');
  }.property('currentUser.uid', 'member', 'canRead'),
  canList: function() {
    return (this.get('currentUser.role') === 'staff_admin');
  }.property('currentUser.uid', 'member', 'canList')
});
