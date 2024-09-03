import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { A } from '@ember/array';

@classic
export default class ShowRoute extends Route {
  @service
  can;

  @service
  router;

  @service
  store;

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
  }

  @action
  queryParamsDidChange() {
    this.refresh();
  }
}
