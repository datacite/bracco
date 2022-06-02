import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  store: service(),

  model() {
    let provider = this.modelFor('providers/show');
    let repository = this.store.createRecord('repository', {
      provider,
      symbol: provider.id.toUpperCase() + '.',
      clientType: 'repository',
      language: [],
      repositoryType: [],
      certificate: [],
      issn: this.store.createFragment('issn')
    })

    repository.get('language').pushObject('');
    repository.get('repositoryType').pushObject('');
    repository.get('certificate').pushObject('');

    return hash({
      provider,
      repository,
      'provider-prefix': null,
      'repository-prefix': this.store.createRecord('repositoryPrefix', {
        repository
      })
    });
  }
});
