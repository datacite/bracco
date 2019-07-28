import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    let self = this;
    return this.store.findRecord('periodical', this.modelFor('periodicals/show').get('id'), { include: 'provider,repository' }).then(function(client) {
      return client;
    }).catch(function(reason){
      if (console.debug) {
        console.debug(reason);
      } else {
        console.log(reason);
      }

      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      self.transitionTo('/');
    });
  },

  afterModel() {
    if (this.get('can').cannot('read periodical', this.modelFor('periodicals/show'))) {
      this.transitionTo('index');
    }
  }
});
