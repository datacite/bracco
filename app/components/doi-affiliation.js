import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  organizations: [],
  organizationsNames: [],

  updateAffiliation(organizationRecord) {
    this.fragment.set('name', organizationRecord.name);
    this.fragment.set('affiliationIdentifier', 'https://' + organizationRecord.id);
    this.fragment.set('schemeUri', 'https://ror.org');
    this.fragment.set('affiliationIdentifierScheme', 'ROR');

    this.setCreatorValidationClass();
  },

  actions: {
    searchOrganization(query) {
      let self = this;
      this.store.query('organization', { 'query': query }).then(function (orgs) {
        let organizations = orgs.toArray();
        let organizationsNames = orgs.mapBy('name');
        self.set('organizations', organizations);
        self.set('organizationsNames', organizationsNames);
        return organizationsNames;
      });
    },
    selectOrganization(organization) {
      let organizationRecord = this.get('organizations').findBy('name', organization);
      this.updateAffiliation(organizationRecord);
    },
    deleteAffiliation() {
      this.creator.get('affiliation').removeObject(this.fragment);
    }
  }
});
