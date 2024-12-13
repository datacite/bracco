// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class DoiSubjects extends Component {
  showSubjects = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.subjects) {
      this.model.subjects = [];
    }
  }

  @action
  addSubject() {
    this.model.subjects.createFragment();
    this.set('showSubjects', true);
  }

  @action
  toggleSubjects() {
    this.set('showSubjects', !this.showSubjects);
  }
}
