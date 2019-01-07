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

    return this.store.query('prefix', params);
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
    year: {
      refreshModel: true
    },
    'provider-id': {
      refreshModel: true
    }
  }
});
