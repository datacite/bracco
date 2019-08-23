import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { A } from '@ember/array';

export default Route.extend({
  can: service(),
  headData: service(),

  model(params) {
    let self = this;
    return this.store.findRecord('doi', params.doi_id, { include: 'client' }).then(function(doi) {
      set(self, 'headData.title', doi.title);
      set(self, 'headData.description', doi.description);

      return doi;
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

  // afterModel() {
  //   if (this.get('can').cannot('view doi', this.modelFor('clients/show/dois/show'))) {
  //     return this.transitionTo('index');
  //   }
  // }
});
