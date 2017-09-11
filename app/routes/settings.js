import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {

  model() {
    let currentUser = this.get('currentUser');

    if (currentUser.get('role') === "staff_admin") {
      return this.store.findRecord('provider', "admin");
    } else if (currentUser.get('role') === "provider_admin") {
      return this.store.findRecord('provider', currentUser.get('provider_id'));
    } else if (currentUser.get('role') === "client_admin") {
      return this.store.findRecord('client', currentUser.get('client_id'), { include: 'provider' });
    } else {
      return null;
    }
  }
});
