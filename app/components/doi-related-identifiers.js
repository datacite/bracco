import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class DoiRelatedIdentifiers extends Component {
  showRelatedIdentifiers = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.get('relatedIdentifiers')) {
      this.model.set('relatedIdentifiers', []);
    }
  }

  @action
  addRelatedIdentifier() {
    this.model.get('relatedIdentifiers').createFragment();
    this.set('showRelatedIdentifiers', true);
  }

  @action
  toggleRelatedIdentifiers() {
    this.set('showRelatedIdentifiers', !this.showRelatedIdentifiers);
  }
}
