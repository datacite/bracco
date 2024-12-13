// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class DoiRelatedIdentifiers extends Component {
  showRelatedIdentifiers = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.relatedIdentifiers) {
      this.model.relatedIdentifiers = [];
    }
  }

  @action
  addRelatedIdentifier() {
    this.model.relatedIdentifiers.createFragment();
    this.set('showRelatedIdentifiers', true);
  }

  @action
  toggleRelatedIdentifiers() {
    this.set('showRelatedIdentifiers', !this.showRelatedIdentifiers);
  }
}
