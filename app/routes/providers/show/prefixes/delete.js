import Route from '@ember/routing/route';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, {
  model(params) {
    let self = this;
    return this.store.query('provider-prefix', { 'provider-id': params['provider-id'], 'prefix-id': params['prefix-id'] }).then(function(providerPrefixes) {
      return providerPrefixes.get("firstObject");
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
  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});