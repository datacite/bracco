// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default class DoiAffiliation extends Component {
  @service
  store;

  constructor(...args) {
    super(...args);

    this.organizations = this.organizations || [];
  }

  updateAffiliation(organizationRecord) {
    if (organizationRecord) {
      this.fragment.name = organizationRecord.name;
      this.fragment.affiliationIdentifier = organizationRecord.id;
      this.fragment.schemeUri = 'https://ror.org';
      this.fragment.affiliationIdentifierScheme = 'ROR';
    } else {
      this.fragment.name = null;
      this.fragment.affiliationIdentifier = null;
      this.fragment.schemeUri = 'https://ror.org';
      this.fragment.affiliationIdentifierScheme = 'ROR';
    }
  }

  @action
  searchRor(query) {
    let self = this;
    this.store
      .query('ror', { query })
      .then(function (organizations) {
        // ROR API does not seem to offer sorting of results.  The Ember array 'sortBy' seems to work.
        organizations = organizations.sortBy('name')
        self.set('organizations', organizations);
      })
      .catch(function (reason) {
        console.debug(reason);
        return [];
      });
  }

  @action
  selectRor(ror) {
    this.updateAffiliation(ror);
  }

  @action
  deleteAffiliation() {
    this.creator.affiliation.removeObject(this.fragment);
  }
}
