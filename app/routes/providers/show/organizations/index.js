import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
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
    params = Object.assign(params, {
      page: {
        number: params.page,
        size: params.size,
        include: 'contacts'
      },
      'consortium-id': this.modelFor('providers/show').get('id')
    });

    return hash({
      provider: this.modelFor('providers/show'),
      organizations: this.store
        .query('provider', params)
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
    if (this.can.cannot('read provider', this.modelFor('providers/show'))) {
      this.router.transitionTo('index');
    }
  }
}
