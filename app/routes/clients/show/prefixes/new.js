import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    return hash({
      client: this.store.findRecord('client', this.modelFor('clients/show').get('id')),
      prefix: this.store.createRecord('client-prefix', { client: this.modelFor('clients/show').get('id') })
    });
  },

  // afterModel() {
  //   if (this.get('can').cannot('create prefix')) {
  //     return this.transitionTo('index');
  //   }
  // }
});
