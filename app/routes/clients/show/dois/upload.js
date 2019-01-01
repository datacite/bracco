import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, {

  model() {
    let client = this.modelFor('clients/show');
    let doi = this.store.createRecord('doi', { client: client, mode: 'upload', state: 'draft' });

    return hash({
      client: client,
      doi: doi
    });
  },

  // afterModel(model) {
  //   if (!this.can('create doi', model)) {
  //     return this.transitionTo('index');
  //   }
  // }
});