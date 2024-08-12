import classic from 'ember-classic-decorator';
import { classNameBindings, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import { capitalize } from '@ember/string';

@classic
@tagName('span')
@classNameBindings('label')
export default class StateLabel extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let state = this.state || 'draft';
    let stateLabels = {
      draft: 'label-warning',
      registered: 'label-info',
      findable: 'label-primary'
    };

    this.set('label', 'label ' + stateLabels[state]);
    this.set('stateDisplay', capitalize(state));
  }
}
