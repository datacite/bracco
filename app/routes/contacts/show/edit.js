import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    let contact = this.modelFor('contacts/show');
    contact.set('confirmDelete', 'Delete');
    return contact;
  },

  afterModel() {
    if (this.can.cannot('update contact', this.modelFor('contacts/show'))) {
      this.transitionTo('index');
    }
  }
});
