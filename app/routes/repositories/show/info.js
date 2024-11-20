import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class InfoRoute extends Route {
  @service
  can;

  @service
  router;

  @service
  flashMessages;

  @service
  store;

  model() {
    let self = this;
    return this.store
      .findRecord('repository', this.modelFor('repositories/show').get('id'), {
        include: 'provider'
      })
      .then(function (repository) {
        return repository;
      })
      .catch(function (reason) {
        console.debug(reason);

        self.get('flashMessages').warning(reason);
        self.router.transitionTo('/');
      });
  }

  afterModel() {
    if (
      this.can.cannot('read repository', this.modelFor('repositories/show'))
    ) {
      this.router.transitionTo('index');
    }
  }

  @action
  queryParamsDidChange() {
    this.refresh();
  }
}
