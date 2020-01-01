import Component from '@ember/component';
import { capitalize } from '@ember/string';

export default Component.extend({
  tagName: 'span',
  classNameBindings: [ 'label' ],

  didReceiveAttrs() {
    this._super(...arguments);

    let state = this.state || 'draft';
    let stateLabels = { 'draft': 'label-warning',
      'registered': 'label-info',
      'findable': 'label-primary' };

    this.set('label', 'label ' + stateLabels[state]);
    this.set('stateDisplay', capitalize(state));
  },
});
