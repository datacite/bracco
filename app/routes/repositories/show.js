import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  can: service(),
  flashMessages: service(),

  model(params) {
    let self = this;
    return this.store.findRecord('repository', params.repository_id, { include: 'provider' }).then(function(repository) {
      return repository;
    }).catch(function(reason){
      if (console.debug) {
        console.debug(reason);
      } else {
        console.log(reason);
      }

      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      self.transitionTo('index');
    });
  },

  afterModel(model) {
    if (this.get('can').cannot('read repository', model)) {
      this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
