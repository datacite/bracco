import { hash } from 'rsvp';
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
      },
      include: 'provider'
    });

    return hash({
      provider: null,
      repositories: this.store
        .query('repository', params)
        .then(function (result) {
          return result;
        })
        .catch(function (reason) {
          console.debug(reason);
          return [];
        })
    });
  },

  queryParams: {
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    },
    year: {
      refreshModel: true
    },
    software: {
      refreshModel: true
    },
    language: {
      refreshModel: true
    },
    certificate: {
      refreshModel: true
    },
    'provider-id': {
      refreshModel: true
    },
    'client-type': {
      refreshModel: true
    },
    'repository-type': {
      refreshModel: true
    }
  },

  afterModel() {
    if (this.can.cannot('read index')) {
      this.transitionTo('index');
    }
  }
});
