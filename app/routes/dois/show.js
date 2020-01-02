import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Route.extend({
  can: service(),

  model(params) {
    let self = this;
    return this.store.findRecord('doi', params.doi_id, { include: 'client' }).then(function(doi) {
      set(self, 'headData.title', doi.title);
      set(self, 'headData.description', doi.description);
      return doi;
    }).catch(function(reason) {
      console.debug(reason);

      self.get('flashMessages').warning('Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      self.transitionTo('/');
    });
  },

  // afterModel(model) {
  //   if (this.get('can').cannot('view doi', model)) {
  //     return this.transitionTo('index');
  //   }
  // }
});
