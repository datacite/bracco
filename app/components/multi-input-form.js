// import Ember from 'ember';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'div',
  classNames: ['multi-part-form'],
  // isDisabled: Ember.computed('model', function() {
  //   return Ember.isEmpty(this.get('model').get('creator').get('lastObject'));
  // }),

  actions: {
    add: function() {
      this.get('model').get('creator').addObject('');
    },
    delete: function(item) {
      this.get('model').get('creator').removeObject(item);
    }
  }
});
