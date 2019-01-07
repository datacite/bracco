import Route from '@ember/routing/route';
import { assign } from '@ember/polyfills';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, {
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
    if (!this.can('read index')) {
      return this.transitionTo('index');
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
