// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

const stateList = {
  draft: ['draft', 'registered', 'findable'],
  registered: ['registered', 'findable'],
  findable: ['registered', 'findable']
};

export default class DoiState extends Component {
  draft = true;
  registered = true;
  findable = true;
  stateList = stateList;
  state = null;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    this.selectState(this.model.state);
  }

  selectState(state) {
    this.set('state', state);
    this.model.state = state;
    this.setStates(state);
  }

  setStates(state) {
    if (state == '' || state == 'undetermined') {
      state = 'draft';
    }
    let states = [];
    states = stateList[state];
    A(states).forEach((item) => {
      this.set(item, false);
    });
  }

  @action
  doSelectState(state) {
    this.selectState(state);
  }

  @action
  setStatesAction(state) {
    this.setStates(state);
  }
}
