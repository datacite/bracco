// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class DoiRightsList extends Component {
  showRights = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.rightsList) {
      this.model.rightsList = [];
    }
  }

  @action
  addRights() {
    this.model.rightsList.createFragment();
    this.set('showRights', true);
  }

  @action
  toggleRights() {
    this.set('showRights', !this.showRights);
  }
}
