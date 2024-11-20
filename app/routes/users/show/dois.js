import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default class DoisRoute extends Route {
  @service
  can;

  @service
  router;

  @service
  store;

  model(params) {
    let user = this.modelFor('users/show');
    params = Object.assign(params, {
      page: {
        number: params.page,
        size: params.size
      },
      'user-id': user.get('id')
    });

    return hash({
      user,
      dois: this.store
        .query('doi', params)
        .then(function (result) {
          return result;
        })
        .catch(function (reason) {
          console.debug(reason);
          return null;
        })
    });
  }

  queryParams = {
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    }
  };

  afterModel() {
    if (this.can.cannot('read user', this.modelFor('users/show').user)) {
      this.router.transitionTo('index');
    }
  }
}
