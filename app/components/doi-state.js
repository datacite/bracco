import Component from '@ember/component';

const stateList = {
  undetermined: ['undetermined', 'registered', 'findable'],
  draft: ['draft', 'registered', 'findable'],
  registered: ['registered', 'findable'],
  findable: ['registered', 'findable']
}

export default Component.extend({
  classNames: ['form-group'],

  draft: true,
  registered: true,
  findable: true,

  stateList,
  state: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.selectState(this.get('model').get('state'));
  },

  selectState(state) {
    this.set('state', state);
    this.get('model').set('state', state);
    this.setStates(state)
  },
  setStates(state) {
    let states = [];
    // test prefix uses only draft state
    if (this.get('model').get('prefix') === '10.5072') {
      states = ['draft'];
    } else {
      states = stateList[state];
    }
    states.forEach((item) => {
      this.set(item, false);
    });
  },

  actions: {
    selectState(state) {
      this.selectState(state);
    },
    setStates(state) {
      this.setStates(state);
    }
  }
});
