import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['row'],
  isSandbox: false,

  didInsertElement() {
    if (this.get('model.otherParams.provider-id') === 'sandbox') {
      this.set('isSandbox', true);
    }
  }
});
