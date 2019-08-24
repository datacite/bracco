import Route from '@ember/routing/route';
import { assign } from '@ember/polyfills';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model(params) {
    params = assign(params, { 
      page: {
        number: params.page,
        size: params.size 
      }
    });

    return this.store.query('doi', params);
  },

  afterModel() {
    if (this.can.cannot('read index')) {
      this.transitionTo('index');
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
