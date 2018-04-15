import Component from '@ember/component';

const stateList = {
  undetermined: ['undetermined', 'registered', 'findable'],
  draft: ['draft', 'registered', 'findable'],
  registered: ['registered', 'findable'],
  findable: ['registered', 'findable']
}

export default Component.extend({
  classNames: ['form-group'],

  stateList,
  states: [],
  state: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.setStates(this.get('model').get('state'));
  },

  setStates(state) {
    // test prefix uses only draft state
    if (this.get('model').get('prefix') === '10.5072') {
      this.set('states', ['draft']);
      this.get('model').set('state', 'draft');
    } else {
      this.set('states', stateList[state]);
    }
  },

  actions: {
    selectState(state) {
      this.get('model').set('state', state);
    }
  }
});
