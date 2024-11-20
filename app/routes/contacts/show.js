import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ShowRoute extends Route {
  @service
  can;

  @service
  features;

  @service
  flashMessages;

  @service
  headData;

  @service
  router;

  @service
  store;

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

        self.get('flashMessages').warning(reason);
        self.router.transitionTo('index');
      });
  }

  afterModel(model) {
    if (this.can.cannot('read contact', model)) {
      this.router.transitionTo('index');
    }
  }

  @action
  queryParamsDidChange() {
    this.refresh();
  }
}
