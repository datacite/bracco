import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  can: service(),
  features: service(),
  flashMessages: service(),
  headData: service(),

  model(params) {
    let self = this;
    return this.store
      .findRecord('contact', params.contact_id, { include: 'provider' })
      .then(function (contact) {
        self.headData.set('title', contact.name);

        return contact;
      })
      .catch(function (reason) {
        console.debug(reason);

        self
          .get('flashMessages')
          .warning(
            'Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.'
          );
        self.transitionTo('index');
      });
  },

  afterModel(model) {
    if (this.can.cannot('read contact', model)) {
      this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
