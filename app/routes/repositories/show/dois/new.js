import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default Route.extend({
  can: service(),
  spdx: service(),

  model() {
    let repository = this.modelFor('repositories/show');
    let doi = this.store.createRecord('doi', { repository, mode: 'new', state: 'draft', titles: [], descriptions: [], creators: [] });

    return hash({
      repository,
      doi,
    });
  },

  // spdxList() {
  //   let self = this;
  //   let url = spdxUrl;
  //   fetch(url).then(function(response) {
  //     if (response.ok) {
  //       response.json().then(function(data) {
  //         self.set('spdxLicenseListComplete', data.licenses);
  //         self.set('spdxLicenseList', data.licenses);
  //         return (data);
  //       });
  //     } else {
  //       console.debug(response);
  //     }
  //   }).catch(function(error) {
  //     console.debug(error);
  //   });
  // },


  // afterModel(model) {
  //   if (this.get('can').cannot('create doi', model)) {
  //     return this.transitionTo('index');
  //   }
  // }
});
