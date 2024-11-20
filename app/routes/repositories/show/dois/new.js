import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default class NewRoute extends Route {
  @service
  can;

  @service
  flashMessages;

  @service
  store;

  model() {
    let repository = this.modelFor('repositories/show');
    let doi = this.store.createRecord('doi', {
      repository,
      mode: 'new',
      state: 'draft',
      titles: [],
      descriptions: [],
      creators: []
    });

    return hash({
      repository,
      doi
    });
  }
}
