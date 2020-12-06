import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    let self = this;
    return this.store
      .findRecord('repository', this.modelFor('repositories/show').id, {
        include: 'provider'
      })
      .then(function (repository) {
        return repository;
      })
      .catch(function (reason) {
        console.debug(reason);

        self.flashMessages.warning(
          'Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.'
        );
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
