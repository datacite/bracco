import Route from '@ember/routing/route';
import { assign } from '@ember/polyfills';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  currentUser: service(),
  flashMessages: service(),
  prefixes: service(),

  model(params) {
    params = assign(params, {
      page: {
        number: params.page,
        size: params.size
      },
      include: 'providers,clients'
    });

    return this.store
      .query('prefix', params)
      .then(function (result) {
        return result;
      })
      .catch(function (reason) {
        console.debug(reason);
        return null;
      });
  },

  afterModel() {
    if (this.can.cannot('read index')) {
      this.transitionTo('index');
    } else if (this.get('currentUser.role_id') === 'staff_admin') {
      let self = this;
      this.prefixes.available().then(function(value) {
        if (value <= 0) {
          self.get('flashMessages').danger("There are 0 prefixes available. Request new prefixes to CNRI.");
        }
      }, function(reason) {
        console.debug(reason);
      });
    }
  },

  queryParams: {
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    },
    state: {
      refreshModel: true
    },
    year: {
      refreshModel: true
    },
    'provider-id': {
      refreshModel: true
    }
  }
});
