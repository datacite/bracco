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
        include: 'contacts'
      }
    });

    return this.store
      .query('provider', params)
      .then(function (result) {
        return result;
      })
      .catch(function (reason) {
        console.debug(reason);
        return null;
      });
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
    'member-type': {
      refreshModel: true
    },
    'organization-type': {
      refreshModel: true
    },
    'focus-area': {
      refreshModel: true
    },
    'non-profit-status': {
      refreshModel: true
    }
  },

  afterModel() {
    if (this.can.cannot('read index')) {
      this.transitionTo('index');
    }
  }
});
