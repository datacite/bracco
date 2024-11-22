// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class DoiAlternateIdentifiers extends Component {
  @tracked showAlternateIdentifiers = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.alternateIdentifiers) {
      this.model.alternateIdentifiers = [];
    }
  }

  @action
  addAlternateIdentifier() {
    this.model.alternateIdentifiers.createFragment();
    this.showAlternateIdentifiers = true;
  }

  @action
  toggleAlternateIdentifiers() {
    this.showAlternateIdentifiers = !this.showAlternateIdentifiers;
  }
}
