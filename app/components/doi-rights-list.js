import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class DoiRightsList extends Component {
  showRights = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.get('rightsList')) {
      this.model.set('rightsList', []);
    }
  }

  @action
  addRights() {
    this.model.get('rightsList').createFragment();
    this.set('showRights', true);
  }

  @action
  toggleRights() {
    this.set('showRights', !this.showRights);
  }
}
