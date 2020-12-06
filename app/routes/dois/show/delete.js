import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    let self = this;
    return this.store
      .findRecord('doi', this.modelFor('dois/show').id, {
        include: 'client'
      })
      .then(function (doi) {
        return doi;
      })
      .catch(function (reason) {
        console.debug(reason);

        self.flashMessages.warning(
          'Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.'
        );
        self.transitionTo('/');
      });
  },

  afterModel() {
    if (this.can.cannot('delete doi', this.modelFor('dois/show'))) {
      this.transitionTo('index');
    } else {
      this.modelFor('dois/show').set('mode', 'delete');
    }
  }
});
