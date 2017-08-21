import Ember from 'ember';

export default Ember.Component.extend({
  currentUser: Ember.inject.service(),
  tagName: 'div',

  didInsertElement: function() {
    this.set('currentUser', this.get('currentUser'));
  }
});
