import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: Ember.inject.service(),

  canRead: function() {
    return (this.get('currentUser.role') === 'member_admin');
  }.property('currentUser.uid', 'settings', 'canRead')
});
