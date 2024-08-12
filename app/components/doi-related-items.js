import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class DoiRelatedItems extends Component {
  showRelatedItems = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.get('relatedItems')) {
      this.model.set('relatedItems', []);
    }
  }

  @action
  addRelatedItem() {
    this.model.get('relatedItems').createFragment();
    this.set('showRelatedItems', true);
  }

  @action
  toggleRelatedItems() {
    this.set('showRelatedItems', !this.showRelatedItems);
  }
}
