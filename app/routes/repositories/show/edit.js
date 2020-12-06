import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    let repository = this.modelFor('repositories/show');
    repository.set('confirmSymbol', repository.symbol);
    return repository;
  },

  afterModel() {
    if (
      this.can.cannot('update repository', this.modelFor('repositories/show'))
    ) {
      this.transitionTo('index');
    }
  }
});
