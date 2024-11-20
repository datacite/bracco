import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class EditRoute extends Route {
  @service
  can;

  @service
  features;

  @service
  router;

  async model() {
    let provider = this.modelFor('providers/show');
    provider.set('confirmSymbol', provider.get('symbol'));

    let contacts = await provider.get('contacts')
    let filteredContacts = contacts.filter(function (contact) {
      return contact.deleted === null;
    })
    provider.set('filteredContacts', filteredContacts)

    return provider;
  }

  afterModel(model) {
    if (this.can.cannot('read provider', model)) {
      this.router.transitionTo('index');
    }
  }
}
