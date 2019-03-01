import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, {
  model() {
    let client = this.modelFor('clients/show');
    let doi = this.store.createRecord('doi', { client: client, mode: 'new', state: 'draft', creators: '' });
    doi.get('titles').createFragment({
      title: '',
      titleType: null,
      lang: null,
    });

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
