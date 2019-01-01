import Route from '@ember/routing/route';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, {
  model() {
    let self = this;
    return this.store.findRecord('doi', this.modelFor('clients/show/dois/show').get('id'), { include: 'client' }).then(function(doi) {
      return doi;
    }).catch(function(reason){
      if (console.debug) {
        console.debug(reason);
      } else {
        console.log(reason);
      }

      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('/');
    });
  },

  // afterModel() {
  //   if (!this.can('view doi', this.modelFor('clients/show/dois/show'))) {
  //     return this.transitionTo('index');
  //   }
  // }
});