import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    return hash({
      client: this.store.findRecord('periodical', this.modelFor('periodicals/show').get('id')),
      prefix: this.store.createRecord('clientPrefix')
    });
  },

  // afterModel() {
  //   if (this.get('can').cannot('create prefix')) {
  //     return this.transitionTo('index');
  //   }
  // }
});
