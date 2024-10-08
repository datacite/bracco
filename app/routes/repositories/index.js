import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
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
  };

  afterModel() {
    if (this.can.cannot('read index')) {
      this.router.transitionTo('index');
    } else if (this.get('currentUser.role_id') === 'staff_admin') {
      let self = this;
      this.prefixes.available().then(
        function (value) {
          if (value <= 0) {
            self
              .get('flashMessages')
              .danger(
                'There are 0 prefixes available. Request new prefixes to CNRI.'
              );
          }
        },
        function (reason) {
          console.debug(reason);
        }
      );
    }
  }
}
