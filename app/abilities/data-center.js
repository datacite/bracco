import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: Ember.inject.service(),

  canWrite: function() {
    return (this.get('currentUser.role') === 'staff_admin');
  }.property('currentUser.isAdmin'),
  canRead: function() {
    let member = (this.get('currentUser.role') === 'member_admin' &&
      this.get('currentUser.member_id') === this.get('model.member.id'));
    let staff = this.get('currentUser.role') === 'staff_admin';
    return member || staff;
  }.property('currentUser.isAdmin'),
  canList: function() {
    return (['staff_admin', 'member_admin'].includes(this.get('currentUser.role')));
  }.property('currentUser.isAdmin')
});
