import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { assign } from '@ember/polyfills';

export default Route.extend({
  can: service(),
  currentUser: service(),
  flashMessages: service(),
  prefixes: service(),

  model(params) {
    params = assign(params, {
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
  },

  queryParams: {
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
  },

  afterModel() {
    this.get('flashMessages').danger("There are 0 prefixes available. Request new prefixes to CNRI.");

    if (this.can.cannot('read index')) {
      this.transitionTo('index');
    } else if (this.get('currentUser.role_id') === 'staff_admin') {
      let self = this;
      self.get('flashMessages').danger("There are 0 prefixes available. Request new prefixes to CNRI.");

      this.prefixes.available().then(function(value) {
        if (value <= 0) {
          self.get('flashMessages').danger("There are 0 prefixes available. Request new prefixes to CNRI.");
        }
      }, function(reason) {
        console.debug(reason);
      });
    }
  }
});
