import { hash } from 'rsvp';
import { assign } from '@ember/polyfills';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model(params) {
    params = assign(params, {
      page: {
        number: params.page,
        size: params.size,
      },
      'repository-id': this.modelFor('repositories/show').get('id'),
    });

    return hash({
      repository: this.modelFor('repositories/show'),
      'repository-prefixes': this.store.query('repository-prefix', params),
    });
  },

  afterModel() {
    if (this.can.cannot('read repository', this.modelFor('repositories/show'))) {
      this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    },
    refreshCurrentRoute() {
      this.refresh();
    },
  },
});
