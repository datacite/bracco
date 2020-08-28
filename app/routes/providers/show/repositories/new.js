import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    let provider = this.modelFor('providers/show');
    let repository = this.store.createRecord('repository', {
      provider,
      symbol: provider.id.toUpperCase() + '.',
      clientType: 'repository',
      language: [],
      repositoryType: [],
      certificate: [],
      serviceContact: this.store.createFragment('contact'),
      issn: this.store.createFragment('issn'),
    });

    repository.get('language').pushObject('');
    repository.get('repositoryType').pushObject('');
    repository.get('certificate').pushObject('');

    return hash({
      provider,
      repository,
    });
  },

  afterModel() {
    this.flashMessages.warning('The contacts entered may receive notifications about training sessions, webinars, product testing, or news that will impact the use of DataCite services. Individuals may remove themselves from mailings by following the unsubscribe link provided in every DataCite email. For information about our privacy practices and commitment to protecting your privacy, please review our Privacy Policy.', {
      sticky: true,
    });
  },
});
