import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
export default class DoiAffiliation extends Component {
  @service
  store;

  init(...args) {
    super.init(...args);

    this.organizations = this.organizations || [];
  }

  updateAffiliation(organizationRecord) {
    if (organizationRecord) {
      this.fragment.set('name', organizationRecord.name);
      this.fragment.set('affiliationIdentifier', organizationRecord.id);
      this.fragment.set('schemeUri', 'https://ror.org');
      this.fragment.set('affiliationIdentifierScheme', 'ROR');
    } else {
      this.fragment.set('name', null);
      this.fragment.set('affiliationIdentifier', null);
      this.fragment.set('schemeUri', 'https://ror.org');
      this.fragment.set('affiliationIdentifierScheme', 'ROR');
    }
  }

  @action
  searchRor(query) {
    let self = this;
    this.store
      .query('ror', { query })
      .then(function (organizations) {
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
    this.creator.get('affiliation').removeObject(this.fragment);
  }
}
