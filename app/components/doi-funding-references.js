import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class DoiFundingReferences extends Component {
  showFundingReferences = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.get('fundingReferences')) {
      this.model.set('fundingReferences', []);
    }
  }

  @action
  addFundingReference() {
    this.model.get('fundingReferences').createFragment();
    this.set('showFundingReferences', true);
  }

  @action
  toggleFundingReferences() {
    this.set('showFundingReferences', !this.showFundingReferences);
  }
}
