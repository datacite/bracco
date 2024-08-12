import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class DoiContributors extends Component {
  showContributors = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model.get('contributors')) {
      this.model.set('contributors', []);
    }
  }

  @action
  addContributor() {
    this.model
      .get('contributors')
      .createFragment({ nameIdentifiers: [], affiliation: [] });
    this.model
      .get('contributors')
      .get('lastObject')
      .get('nameIdentifiers')
      .createFragment();
    this.model
      .get('contributors')
      .get('lastObject')
      .get('affiliation')
      .createFragment();
    this.set('showContributors', true);
  }

  @action
  toggleContributors() {
    this.set('showContributors', !this.showContributors);
  }
}
