import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  @service
  can;

  @service
  currentUser;

  @service
  flashMessages;

  @service
  prefixes;

  @service
  router;

  @service
  store;

  model(params) {
    params = Object.assign(params, {
      page: {
        number: params.page,
        size: params.size
      }
    });

    return this.store
      .query('user', params)
      .then(function (result) {
        return result;
      })
      .catch(function (reason) {
        console.debug(reason);
        return null;
      });
  }

  queryParams = {
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    },
    'provider-id': {
      refreshModel: true
    },
    'repository-id': {
      refreshModel: true
    }
  };

  afterModel() {
    if (this.can.cannot('read index')) {
      this.router.transitionTo('index');
    }
  }
}
