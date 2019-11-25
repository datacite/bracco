import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    let repository = this.modelFor('repositories/show');
    let doi = this.store.createRecord('doi', { repository: repository, mode: 'new', state: 'draft', titles: [], descriptions: [], creators: [] });

    return hash({
      repository: repository,
      doi: doi
    });
  },

  // afterModel(model) {
  //   if (this.get('can').cannot('create doi', model)) {
  //     return this.transitionTo('index');
  //   }
  // }
});
