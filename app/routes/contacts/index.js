import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { assign } from '@ember/polyfills';

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
    params = assign(params, {
      page: {
        number: params.page,
        size: params.size
      },
      include: 'provider'
    });

    return hash({
      provider: null,
      contacts: this.store
        .query('contact', params)
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
    },
    'role-name': {
      refreshModel: true
    }
  };

  afterModel() {
    if (this.can.cannot('read index')) {
      this.router.transitionTo('index');
    }
  }
}
