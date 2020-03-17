import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Route.extend({
  can: service(),

  model(params) {
    let self = this;
    return this.store.query('repository-prefix', { 'repository-id': this.modelFor('repositories/show').get('id'), 'prefix-id': params.prefix_id }).then(function(repositoryPrefixes) {
      return A(repositoryPrefixes).get('firstObject');
    }).catch(function(reason) {
      console.debug(reason);

      self.get('flashMessages').warning('Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      self.transitionTo('/');
    });
  },

  afterModel(model) {
    if (this.can.cannot('read prefix', model)) {
      this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    },
  },
});
