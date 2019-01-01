import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { assign } from '@ember/polyfills';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, {
  flashMessages: service(),

  model(params) {
    params = assign(params, { 
      page: {
        number: params.page,
        size: params.size 
      }
    });

    return this.store.query('provider', params);
  },

  queryParams: {
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    },
    region: {
      refreshModel: true
    },
    year: {
      refreshModel: true
    },
    'organization-type': {
      refreshModel: true
    },
    'focus-area': {
      refreshModel: true
    }
  },

  afterModel() {
    if (!this.can('read index')) {
      return this.transitionTo('index');
    }
  }
});
