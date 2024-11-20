import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default class NewRoute extends Route {
  @service
  can;

  @service
  store;

  @service
  flashMessages;

  model() {
    let provider = this.modelFor('providers/show');
    let contact = this.store.createRecord('contact', {
      provider
    });

    return hash({
      provider,
      contact
    });
  }
}
