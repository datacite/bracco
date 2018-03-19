// import Ember from 'ember';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'div',
  classNames: ['multi-part-form'],
  // isDisabled: Ember.computed('model', function() {
  //   return Ember.isEmpty(this.get('model').get('creator').get('lastObject'));
  // }),

  add() {
    if (typeof this.get('model').get('creator') === 'undefined') {
      this.get('model').set('creator', [])
    }
    this.get('model').get('creator').addObject('');
  },
  update(item) {
    console.log(item)
  },
  delete(item) {
    this.get('model').get('creator').removeObject(item);
  },

  actions: {
    add() {
      this.add();
    },
    update(item) {
      this.update(item);
    },
    delete(item) {
      this.delete(item);
    }
  }
});
