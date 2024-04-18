import { hash } from 'rsvp';
import { assign } from '@ember/polyfills';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  prefixes: service(),
  router: service(),
  store: service(),

  model(params) {
    let repositoryId = this.modelFor('repositories/show').get('id');

    params = assign(params, {
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
  },

  afterModel() {
    if (
      this.can.cannot('read repository', this.modelFor('repositories/show'))
    ) {
      this.router.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    },
    refreshCurrentRoute() {
      this.refresh();
    }
  }
});
