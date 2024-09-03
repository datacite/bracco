import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class DoiAlternateIdentifiers extends Component {
  showAlternateIdentifiers = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.get('alternateIdentifiers')) {
      this.model.set('alternateIdentifiers', []);
    }
  }

  @action
  addAlternateIdentifier() {
    this.model.get('alternateIdentifiers').createFragment();
    this.set('showAlternateIdentifiers', true);
  }

  @action
  toggleAlternateIdentifiers() {
    this.set('showAlternateIdentifiers', !this.showAlternateIdentifiers);
  }
}
