import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Route.extend({
  can: service(),
  features: service(),
  headData: service(),
  
  model(params) {
    let self = this;
    return this.store.findRecord('provider', params.provider_id, { include: 'consortium,consortium-organizations' }).then(function(provider) {
      set(self, 'headData.title', provider.displayName); 
      set(self, 'headData.description', provider.description);
      set(self, 'headData.image', provider.logoUrl); 

      return provider;
    }).catch(function(reason){
      if (console.debug) {
        console.debug(reason);
      } else {
        console.log(reason);
      }

      self.get('flashMessages').warning('Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      self.transitionTo('/');
    });
  },

  redirect(model) {
    if (this.can.cannot('read provider', model)) {
      this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
