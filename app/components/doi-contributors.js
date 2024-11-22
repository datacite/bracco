// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class DoiContributors extends Component {
  @tracked showContributors = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.contributors) {
      this.model.contributors = [];
    }
  }

  @action
  addContributor() {
    this.model.contributors.createFragment({ nameIdentifiers: [], affiliation: [] });
    this.model.contributors.lastObject.nameIdentifiers.createFragment();
    this.model.contributors.lastObject.affiliation.createFragment();
    this.showContributors = true;
  }

  @action
  toggleContributors() {
    this.showContributors = !this.showContributors;
  }
}
