// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class DoiDescriptions extends Component {
  @tracked showDescriptions = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.descriptions) {
      this.model.descriptions = [];
    }
  }

  @action
  addDescription() {
    this.model.get('descriptions').createFragment();
    this.showDescriptions = true;
  }

  @action
  toggleDescriptions() {
    this.showDescriptions = !this.showDescriptions;
  }
}
