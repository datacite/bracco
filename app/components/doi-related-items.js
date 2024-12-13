// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class DoiRelatedItems extends Component {
  showRelatedItems = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.get('relatedItems')) {
      this.model.relatedItems = [];
    }
  }

  @action
  addRelatedItem() {
    this.model.relatedItems.createFragment();
    this.set('showRelatedItems', true);
  }

  @action
  toggleRelatedItems() {
    this.set('showRelatedItems', !this.showRelatedItems);
  }
}
