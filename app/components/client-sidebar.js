import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['panel', 'facets', 'add'],

  didInsertElement: function() {
    this.set('currentUser', this.get('currentUser'));
  }
});
