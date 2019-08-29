import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  organizations: [],

  updateAffiliation(organizationRecord) {
    this.fragment.set('name', organizationRecord.name);
    this.fragment.set('affiliationIdentifier', organizationRecord.id);
    this.fragment.set('schemeUri', 'https://ror.org');
    this.fragment.set('affiliationIdentifierScheme', 'ROR');

    this.setCreatorValidationClass();
  },

  actions: {
    searchRor(query) {
      let self = this;
      this.store.query('ror', { 'query': query }).then(function (organizations) {
        self.set('organizations', organizations);
      });
    },
    selectRor(ror) {
      if (ror) {
        this.updateAffiliation(ror);
      } else {
        this.updateAffiliation(null);
      }
    },
    deleteAffiliation() {
      this.creator.get('affiliation').removeObject(this.fragment);
    }
  }
});
