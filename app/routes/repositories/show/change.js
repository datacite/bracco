import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ChangeRoute extends Route {
  @service
  can;

  @service
  features;

  @service
  router;

  @service
  store;

  model() {
    let repository = this.modelFor('repositories/show');
    repository.set('confirmSymbol', repository.get('symbol'));
    return repository;
  }

  afterModel(model) {
    if (this.can.cannot('update repository', model)) {
      this.router.transitionTo('index');
    }
  }
}
