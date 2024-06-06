import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class EditRoute extends Route {
  @service
  can;

  @service
  router;

  model() {
    let contact = this.modelFor('contacts/show');
    contact.set('confirmDelete', 'Delete');
    return contact;
  }

  afterModel() {
    if (this.can.cannot('update contact', this.modelFor('contacts/show'))) {
      this.router.transitionTo('index');
    }
  }
}
