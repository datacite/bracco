// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class DoiDates extends Component {
  @tracked showDates = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.dates) {
      this.model.dates = [];
    }
  }

  @action
  addDate() {
    this.model.dates.createFragment();
    this.showDates = true;
  }

  @action
  toggleDates() {
    this.showDates = !this.showDates;
  }
}
