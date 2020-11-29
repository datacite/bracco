import { hash } from 'rsvp';
import { assign } from '@ember/polyfills';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

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
      dois: this.store
        .query('doi', params)
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
    }
  },

  afterModel() {
    if (this.can.cannot('read provider', this.modelFor('providers/show'))) {
      this.transitionTo('index');
    }
  }
});
