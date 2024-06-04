import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),
  currentUser: service(),

  init() {
    this._super(...arguments);
    if (this.session.sessionAuthenticated) {
      this._loadCurrentUser();
    }
  }
});
