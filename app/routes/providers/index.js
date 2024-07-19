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
  }

  queryParams = {
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
    },
    'has-required-contacts': {
      refreshModel: true
    }
  };

  afterModel() {
    if (this.can.cannot('read index')) {
      this.router.transitionTo('index');
    }
    /*
    } else if (this.get('currentUser.role_id') === 'staff_admin') {
      let self = this;
      this.prefixes.available().then(function(value) {
        if (value <= 0) {
          self.get('flashMessages').danger(self.prefixes.msg_zero);
        }
      }, function(reason) {
        console.debug(reason);
      });
    }
    */
  }
}
