import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  flashMessages: service(),

  model() {
    let self = this;
    return this.store.findRecord('doi', this.modelFor('dois/show').get('id'), { include: 'client' }).then(function(doi) {
      if (!doi.schemaVersion.endsWith('kernel-4')) {
        self.get('flashMessages').warning('Using the Form would update this DOI to the lasest schema version.');
      }
      return doi;
    }).catch(function(reason) {
      console.debug(reason);

      self.get('flashMessages').warning('Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      self.transitionTo('/');
    });
  },

  afterModel() {
    if (this.can.cannot('delete doi', this.modelFor('dois/show'))) {
      this.transitionTo('index');
    } else {
      this.modelFor('dois/show').set('mode', 'edit');
      this.flashMessages.warning('This form is in BETA. Send feedback to support@datacite.org.', {
        sticky: true,
      });
    }
  },
});
