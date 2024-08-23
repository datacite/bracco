import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  @service
  can;

  @service
  features;

  @service
  router;

  @service
  store;

  model(params) {
    let providerId = null;
    let consortiumId = null;
    let model = this.modelFor('providers/show');
    if (model.memberType === 'consortium') {
      consortiumId = model.get('id').toLowerCase();
    } else {
      providerId = model.get('id').toLowerCase();
    }
    params = Object.assign(params, {
      page: {
        number: params.page,
        size: params.size
      },
      'provider-id': providerId,
      'consortium-id': consortiumId
    });

    let ret = hash({
      provider: this.modelFor('providers/show'),
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

    return ret.then(function (ret) {
      // Workaround - going back to settings tab, contacts disappear.
      // ret.provider.contacts = ret.contacts;
      return ret;
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
    if (this.can.cannot('read provider', this.modelFor('providers/show'))) {
      this.router.transitionTo('index');
    }
  }
}
