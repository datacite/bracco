import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class DoiSubjects extends Component {
  showSubjects = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.get('subjects')) {
      this.model.set('subjects', []);
    }
  }

  @action
  addSubject() {
    this.model.get('subjects').createFragment();
    this.set('showSubjects', true);
  }

  @action
  toggleSubjects() {
    this.set('showSubjects', !this.showSubjects);
  }
}
