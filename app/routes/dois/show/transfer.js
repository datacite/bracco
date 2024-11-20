import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class TransferRoute extends Route {
  @service
  can;

  @service
  router;

  @service
  store;

  model() {
    let self = this;
    return this.store
      .findRecord('doi', this.modelFor('dois/show').get('id'), {
        include: 'client'
      })
      .then(function (doi) {
        return doi;
      })
      .catch(function (reason) {
        console.debug(reason);

        self.get('flashMessages').warning(reason);
        self.router.transitionTo('/');
      });
  }

  afterModel() {
    if (this.can.cannot('transfer doi', this.modelFor('dois/show'))) {
      this.router.transitionTo('index');
    } else {
      this.modelFor('dois/show').set('mode', 'modify');
    }
  }
}
