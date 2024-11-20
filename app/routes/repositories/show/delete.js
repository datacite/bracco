import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class DeleteRoute extends Route {
  @service
  can;

  @service
  features;

  @service
  router;

  model() {
    return this.modelFor('repositories/show');
  }

  afterModel(model) {
    if (this.can.cannot('read repository', model)) {
      this.router.transitionTo('index');
    }
  }
}
