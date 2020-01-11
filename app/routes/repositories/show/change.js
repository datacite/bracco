import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  features: service(),

  model() {
    let repository = this.modelFor('repositories/show');
    repository.set('confirmSymbol', repository.get('symbol'));
    return repository;
  },

  afterModel(model) {
    if (this.can.cannot('read repository', model)) {
      this.transitionTo('index');
    }
  },
});
