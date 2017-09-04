import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {

  model() {
    let currentUser = this.get('currentUser');

    if (currentUser.get('role') === "provider_admin") {
      return this.store.findRecord('member', currentUser.get('provider_id'));
    } else if (currentUser.get('role') === "client_admin") {
      return this.store.findRecord('data-center', currentUser.get('client_id'), { include: 'member' });
    } else {
      return null;
    }
  }
});
