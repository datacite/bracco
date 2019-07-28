import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    return hash({
      repository: this.store.findRecord('repository', this.modelFor('repositories/show').get('id')),
      prefix: this.store.createRecord('clientPrefix')
    });
  },

  // afterModel() {
  //   if (this.get('can').cannot('create prefix')) {
  //     return this.transitionTo('index');
  //   }
  // }
});
