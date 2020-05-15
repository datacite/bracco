import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default Route.extend({
  can: service(),
  flashMessages: service(),

  model() {
    let repository = this.modelFor('repositories/show');
    let doi = this.store.createRecord('doi', { repository, mode: 'new', state: 'draft', titles: [], descriptions: [], creators: [] });

    return hash({
      repository,
      doi,
    });
  },

  afterModel() {
    this.flashMessages.warning('This form is in BETA. Send feedback to support@datacite.org.', {
      sticky: true,
    });
  },
});
