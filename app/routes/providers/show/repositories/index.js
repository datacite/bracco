import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { assign } from '@ember/polyfills';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  features: service(),
  currentUser: service(),
  router: service(),
  store: service(),

  model(params) {
    let providerId = null;
    let consortiumId = null;
    let model = this.modelFor('providers/show');
    if (model.memberType === 'consortium') {
      consortiumId = model.get('id');
    } else {
      providerId = model.get('id');
    }
    params = assign(params, {
      page: {
        number: params.page,
        size: params.size
      },
      'provider-id': providerId,
      'consortium-id': consortiumId
    });

    return hash({
      provider: this.modelFor('providers/show'),
      currentUser: this.currentUser,
      repositories: this.store
        .query('repository', params)
        .then(function (result) {
          return result;
        })
        .catch(function (reason) {
          console.debug(reason);
          return null;
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
    }
  },

  afterModel() {
    if (this.can.cannot('read provider', this.modelFor('providers/show'))) {
      this.router.transitionTo('index');
    }
  }
});
