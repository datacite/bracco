import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import { assign } from '@ember/polyfills';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  @service
  can;

  @service
  router;

  @service
  store;

  model(params) {
    params = assign(params, {
      page: {
        number: params.page,
        size: params.size
      },
      'client-id': this.modelFor('repositories/show').get('id')
    });

    return hash({
      repository: this.modelFor('repositories/show'),
      dois: this.store
        .query('doi', params)
        .then(function (result) {
          return result;
        })
        .catch(function (reason) {
          console.debug(reason);
          return null;
        }),
      page: params['page']['number']
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
    if (
      this.can.cannot('read repository', this.modelFor('repositories/show'))
    ) {
      this.router.transitionTo('index');
    }
  }
}
