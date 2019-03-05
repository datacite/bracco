import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  
  model() {
    let client = this.modelFor('clients/show');
    let doi = this.store.createRecord('doi', { client: client, mode: 'new', state: 'draft', titles: [], descriptions: [], creators: [] });
    doi.get('titles').createFragment();
    doi.get('descriptions').createFragment();
    doi.get('creators').createFragment();

    return hash({
      client: client,
      doi: doi
    });
  },

  // afterModel(model) {
  //   if (this.get('can').cannot('create doi', model)) {
  //     return this.transitionTo('index');
  //   }
  // }
});
