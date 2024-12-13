// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';

export default class RepositorySubjects extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    if (!this.model.subjects) {
      this.model.subjects = [];
    }
  }

  @action
  addSubject() {
    this.model.subjects.createFragment();
  }
}
