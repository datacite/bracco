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
      //console.log(this.creator.get('affiliation').firstObject())
      this.set('organization', organization)
      this.creator.set('affiliation', this.creator.get('affiliation').replace(this.index, 1, [organization]));
    },
    deleteAffiliation() {
      this.creator.get('affiliation').removeAt(this.index);
    }
  }
});
