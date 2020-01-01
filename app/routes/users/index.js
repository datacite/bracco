import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { assign } from '@ember/polyfills';

export default Route.extend({
  can: service(),
  flashMessages: service(),

  model(params) {
    params = assign(params, {
      page: {
        number: params.page,
        size: params.size,
      },
    });

    return this.store.query('user', params);
  },

  queryParams: {
    page: {
      refreshModel: true,
    },
    size: {
      refreshModel: true,
    },
    'provider-id': {
      refreshModel: true,
    },
    'repository-id': {
      refreshModel: true,
    },
  },

  afterModel() {
    if (this.can.cannot('read index')) {
      this.transitionTo('index');
    }
  },
});
