import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  store: service(),
  flashMessages: service(),

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
});
