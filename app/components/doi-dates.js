import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class DoiDates extends Component {
  showDates = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.get('dates')) {
      this.model.set('dates', []);
    }
  }

  @action
  addDate() {
    this.model.get('dates').createFragment();
    this.set('showDates', true);
  }

  @action
  toggleDates() {
    this.set('showDates', !this.showDates);
  }
}
