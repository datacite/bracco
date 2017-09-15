import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['row'],

  actions: {
    refreshCurrentRoute(){
      this.sendAction();
    }
  }
});
