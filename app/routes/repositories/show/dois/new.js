import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  
  model() {
    let client = this.modelFor('repositories/show');
    let doi = this.store.createRecord('doi', { client: client.get('id'), mode: 'new', state: 'draft', titles: [], descriptions: [], creators: [] });

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
