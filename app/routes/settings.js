import Route from '@ember/routing/route';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, {
  model() {
    let self = this;
    return this.store.findRecord('provider', 'admin').then(function(admin) {
      return admin;
    }).catch(function(reason){
      if (console.debug) {
        console.debug(reason);
      } else {
        console.log(reason);
      }

      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
    });
  },

  afterModel() {
    if (!this.can('read index')) {
      return this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
