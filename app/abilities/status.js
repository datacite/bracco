import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  canWrite: function() {
    return (this.get('currentUser.role') === 'staff_admin');
  }.property('currentUser.uid', 'status', 'canWrite')
});
