import Component from '@ember/component';

export default Component.extend({
  tagName: 'span',
  classNameBindings: ['label'],

  didInsertElement() {
    let state = this.get('state') || 'draft';
    let stateLabels = { 'draft': 'label-warning',
                        'registered': 'label-info',
                        'findable': 'label-primary' }

    this.set('label', 'label ' + stateLabels[state]);
    this.set('stateDisplay', state.capitalize());
  }
});
