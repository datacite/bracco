import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class NewController extends Controller {
  @service
  store;

  @service
  router;

  @service
  flashMessages;

  @action
  submitAction(contact) {
    let self = this;
    contact
      .save()
      .then(function (c) {
        self.router.transitionTo('contacts.show', c.id);
      })
      .catch(function (reason) {
        console.debug(reason);
      });
  }

  @action
  cancelAction() {
    this.router.transitionTo('providers.show.contacts', this.model.provider);
  }
}
