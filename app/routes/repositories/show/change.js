import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  features: service(),

  model() {
    let repository = this.modelFor('repositories/show');
    repository.set('confirmSymbol', repository.symbol);
    return repository;
  },

  afterModel(model) {
    if (this.can.cannot('update repository', model)) {
      this.transitionTo('index');
    }
  }
});
