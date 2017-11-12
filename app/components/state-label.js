import Component from '@ember/component';

export default Component.extend({
  tagName: 'span',
  classNameBindings: ['label'],

  didInsertElement() {
    let state = this.get('state') || 'new';
    let stateLabel = { 'new': 'label-warning',
                       'draft': 'label-default',
                       'registered': 'label-info',
                       'findable': 'label-primary' }

    this.set('label', 'label ' + stateLabel[state]);
    this.set('state', state.capitalize());
  }
});
