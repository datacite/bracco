import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    let repository = this.modelFor('repositories/show');
    return hash({
      repository: this.store.findRecord('repository', repository.get('id')),
      'repository-prefix': this.store.createRecord('repositoryPrefix', { repository }),
    });
  },

  // afterModel() {
  //   if (this.get('can').cannot('create prefix')) {
  //     return this.transitionTo('index');
  //   }
  // },
});
