import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, {
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
