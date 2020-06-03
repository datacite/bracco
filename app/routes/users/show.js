import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

import { all } from 'rsvp';
import { assign } from '@ember/polyfills';

export default Route.extend({
  can: service(),
  features: service(),
  headData: service(),

  model(params) {

    let self = this;

    let  parameters = assign(params, {
      page: {
        number: params.page,
        size: params.size,
      },
      'user-id': `${params.user_id}`,
    });

    // eslint-disable-next-line no-undef
    return new Promise(function(resolve, reject) {
      all([
        self.store.findRecord('user', params.user_id).then(function(user) {
          set(self, 'headData.title', user.name);
          return user;
        }).catch(function(reason) {
          console.debug(reason);

          self.get('flashMessages').warning('We have not found Datasets with the ORCID record ' + params.user_id + '. Please visit the repository where your resources are deposited and include the ORCID record there.');
          self.transitionTo('/');
        }),
        self.store.query('doi', parameters).then(function(result) {
          return result.meta;
        }).catch(error => console.log(error)) ])
        .then(function([ hashA, hashB ]) {
          resolve(assign(hashA, hashB));
        })
        .catch(reject);
    });
  },

  afterModel(model) {
    if (this.can.cannot('read user', model)) {
      this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    },
  },
});
