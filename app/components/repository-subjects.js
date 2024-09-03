import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class RepositorySubjects extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    if (!this.model.get('subjects')) {
      this.model.set('subjects', []);
    }
  }

  @action
  addSubject() {
    this.model.get('subjects').createFragment();
  }
}
