import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  currentUser: service(),
  flashMessages: service(),

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
      return self.transitionTo('index');
    });
  },

  afterModel() {
    if (this.get('can').cannot('read index') && this.currentUser) {
      let home = this.currentUser.get('home');
      if (home && home.id) {
        return this.transitionTo(home.route, home.id);
      } else if (home) {
        return this.transitionTo(home.route);
      } else {
        return this.transitionTo('index');
      }
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
