import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

@classic
export default class EditController extends Controller {
  @service
  currentUser;

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
        self.router.transitionTo('contacts.show', c);
      })
      .catch(function (reason) {
        console.debug(reason);
      });
  }

  @action
  cancelAction() {
    this.model.rollbackAttributes();
    this.router.transitionTo('contacts.show', this.model);
  }
}
