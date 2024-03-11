import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

import { all } from 'rsvp';
import { assign } from '@ember/polyfills';

export default Route.extend({
  can: service(),
  features: service(),
  headData: service(),
  router: service(),

  model(params) {
    let self = this;

    let parameters = assign(params, {
      page: {
        number: params.page,
        size: params.size
      },
      'user-id': `${params.user_id}`
    });

    // eslint-disable-next-line no-undef
    return new Promise(function (resolve, reject) {
      all([
        self.store
          .findRecord('user', params.user_id)
          .then(function (user) {
            set(self, 'headData.title', user.name);
            return user;
          })
          .catch(function (reason) {
            console.debug(reason);

            self.get('flashMessages').add({
              message:
                'No results found. The ORCID record ' +
                params.user_id +
                ' has not been linked to any DOIs. Contact the repository where your resources are deposited to request your ORCID record is linked to your contents DOIs. Or visit our support website, at https://support.datacite.org/docs/datacite-researcher-profiles, for more information.',
              href: 'https://support.datacite.org/docs/datacite-researcher-profiles',
              type: 'warning'
            });
            self.router.transitionTo('/');
          }),
        self.store
          .query('doi', parameters)
          .then(function (result) {
            return result.meta;
          })
          .catch((error) => console.log(error))
      ])
        .then(function ([hashA, hashB]) {
          resolve(assign(hashA, hashB));
        })
        .catch(reject);
    });
  },

  afterModel(model) {
    if (this.can.cannot('read user', model)) {
      this.router.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
