import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({
  currentUser: service(),

  classNames: ['panel', 'facets', 'add'],

  didInsertElement: function() {
    this.set('currentUser', this.get('currentUser'));
  }
});
