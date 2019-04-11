import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  organizations: [],
  organization: null,

  actions: {
    searchOrganization(query) {
      let self = this;
      this.store.query('organization', { 'query': query, qp: 'multiMatch' }).then(function (orgs) {
        let organizations = orgs.mapBy('name');
        self.set('organizations', organizations);
        return organizations;
      });
    },
    selectOrganization(organization) {
      this.fragment.set('name', organization);
      this.set('organization', organization)
    },
    deleteAffiliation() {
      this.creator.get('affiliations').removeObject(this.fragment);
    }
  }
});
