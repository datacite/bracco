import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Route.extend({
  can: service(),
  router: service(),

  model(params) {
    let self = this;
    return this.store
      .query('provider-prefix', {
        'provider-id': this.modelFor('providers/show').get('id'),
        'prefix-id': params.prefix_id
      })
      .then(function (providerPrefixes) {
        return A(providerPrefixes).get('firstObject');
      })
      .catch(function (reason) {
        console.debug(reason);

        self.get('flashMessages').warning(reason);
        self.router.transitionTo('/');
      });
  },
  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
