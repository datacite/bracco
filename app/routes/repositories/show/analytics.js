import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    let self = this;

    return this.store
      .findRecord('repository', this.modelFor('repositories/show').get('id'), {
        include: 'provider'
      })
      .then(function (repository) {
        return repository;
      })
      .catch(function (reason) {
        console.debug(reason);

        self.get('flashMessages').warning(reason);
        self.transitionTo('/');
      });
  },

  afterModel() {
    if (
      this.can.cannot('read repository', this.modelFor('repositories/show'))
    ) {
      this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
