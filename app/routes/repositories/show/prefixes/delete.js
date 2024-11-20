import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default class DeleteRoute extends Route {
  @service
  can;

  @service
  router;

  @service
  store;

  model(params) {
    let self = this;
    return this.store
      .query('repository-prefix', {
        'repository-id': this.modelFor('repositories/show').get('id'),
        'prefix-id': params.prefix_id
      })
      .then(function (repositoryPrefixes) {
        return A(repositoryPrefixes).get('firstObject');
      })
      .catch(function (reason) {
        console.debug(reason);

        self.get('flashMessages').warning(reason);
        self.router.transitionTo('/');
      });
  }

  afterModel(model) {
    if (this.can.cannot('delete prefix', model)) {
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
