import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  organizations: [],

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
      this.set('affiliation', organization);
      
      //this.creator.get('affiliation')[this.index] = organization;
      console.log(this.affiliation)
      this.creator.get('affiliation').replace(this.index, 1, [organization]);
      console.log(this.creator.get('affiliation').length)
    },
    deleteAffiliation() {
      this.creator.get('affiliation').removeAt(this.index);
    }
  }
});
