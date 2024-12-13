// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class DoiFundingReferences extends Component {
  @tracked showFundingReferences = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.modelfundingReferences) {
      this.model.fundingReferences = [];
    }
  }

  @action
  addFundingReference() {
    this.model.fundingReferences.createFragment();
    this.showFundingReferences = true;
  }

  @action
  toggleFundingReferences() {
    this.showFundingReferences = !this.showFundingReferences;
  }
}
