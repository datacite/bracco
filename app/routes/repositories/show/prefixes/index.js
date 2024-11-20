import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  @service
  can;

  @service
  prefixes;

  @service
  router;

  @service
  store;

  model(params) {
    let repositoryId = this.modelFor('repositories/show').get('id');

    params = Object.assign(params, {
      page: {
        number: params.page,
        size: params.size
      },
      'repository-id': repositoryId
    });

    return hash({
      repository: this.store.findRecord('repository', repositoryId),
      'repository-prefixes': this.store
        .query('repository-prefix', params, { reload: true })
        .then(function (result) {
          return result;
        })
        .catch(function (reason) {
          console.debug(reason);
          return null;
        })
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

  @action
  refreshCurrentRoute() {
    this.refresh();
  }
}
