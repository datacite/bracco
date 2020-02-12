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
      'mix-in': 'metrics',
      'user-stats': true,
    });

    // eslint-disable-next-line no-undef
    return new Promise(function(resolve, reject) {
      all([
        self.store.findRecord('user', params.user_id).then(function(user) {
          set(self, 'headData.title', user.name);
          return user;
        }).catch(function(reason) {
          console.debug(reason);

          self.get('flashMessages').warning('Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
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
