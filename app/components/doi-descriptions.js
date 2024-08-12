import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class DoiDescriptions extends Component {
  showDescriptions = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.get('descriptions')) {
      this.model.set('descriptions', []);
    }
  }

  @action
  addDescription() {
    this.model.get('descriptions').createFragment();
    this.set('showDescriptions', true);
  }

  @action
  toggleDescriptions() {
    this.set('showDescriptions', !this.showDescriptions);
  }
}
