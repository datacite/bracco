import Ember from 'ember';

export default Ember.Component.extend({
  currentUser: Ember.inject.service(),
  tagName: 'div',
  classNames: ['col-md-3'],

  didInsertElement: function() {
    this.set('currentUser', this.get('currentUser'));
  }
});
