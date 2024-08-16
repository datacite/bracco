import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';

@classic
export default class NewRoute extends Route {
  @service
  can;

  @service
  router;

  @service
  store;

  model() {
    let repository = this.modelFor('repositories/show');
    return hash({
      repository: this.store.findRecord('repository', repository.get('id')),
      'repository-prefix': this.store.createRecord('repositoryPrefix', {
        repository
      })
    });
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    this.controllerFor('repositories.show.prefixes.new').send(
      'searchPrefixAction',
      null
    );
  }

  @action
  queryParamsDidChange() {
    this.refresh();
  }

  @action
  refreshCurrentRoute() {
    this.refresh();
  }

  afterModel() {
    if (this.can.cannot('read index')) {
      this.router.transitionTo(
        'repositories.show.prefixes',
        this.modelFor('repositories/show')
      );
    }
  }
}
