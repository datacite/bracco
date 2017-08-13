import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  currentUser: Ember.inject.service(),

  beforeModel: function() {
    if (!this.can('read settings')) {
      this.transitionTo('index');
    }
  },

  model() {
    let currentUser = this.get('currentUser');

    if (currentUser.member_id) {
      return this.store.findRecord('member', currentUser.member_id);
    } else if (currentUser.isAdmin) {

    }
  }
});
