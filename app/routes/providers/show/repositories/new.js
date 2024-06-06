import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';

@classic
export default class NewRoute extends Route {
  @service
  can;

  @service
  store;

  model() {
    let provider = this.modelFor('providers/show');
    let repository = this.store.createRecord('repository', {
      provider,
      symbol: provider.id.toUpperCase() + '.',
      clientType: 'repository',
      language: [],
      repositoryType: [],
      certificate: [],
      issn: this.store.createFragment('issn'),
      serviceContact: this.store.createFragment('contact-fragment')
    });

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
}
