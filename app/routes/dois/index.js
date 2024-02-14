import Route from '@ember/routing/route';
import { assign } from '@ember/polyfills';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  currentUser: service(),
  flashMessages: service(),
  prefixes: service(),
  router: service(),
  store: service(),

  model(params) {
    params = assign(params, {
      page: {
        number: params.page,
        size: params.size
      },
      include: 'client'
    });

    return this.store
      .query('doi', params)
      .then(function (result) {
        return result;
      })
      .catch(function (reason) {
        console.debug(reason);
        return null;
      });
  },

  afterModel() {
    if (this.can.cannot('read index')) {
      this.router.transitionTo('index');
    }
  },

  queryParams: {
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    },
    state: {
      refreshModel: true
    },
    'resource-type-id': {
      refreshModel: true
    },
    year: {
      refreshModel: true
    },
    registered: {
      refreshModel: true
    },
    'client-id': {
      refreshModel: true
    },
    'affiliation-id': {
      refreshModel: true
    },
    prefix: {
      refreshModel: true
    },
    'schema-version': {
      refreshModel: true
    },
    source: {
      refreshModel: true
    },
    'link-check-status': {
      refreshModel: true
    }
  }
});
