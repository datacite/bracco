import { inject as service } from '@ember/service';
import BaseSessionService from 'ember-simple-auth/services/session';

export default BaseSessionService.extend({
  store: service(),
  currentUser: service(),

  async handleAuthentication() {
    try {
      this._super(...arguments);
      await this.currentUser.load();
    } catch (err) {
      await this.invalidate();
    }
  }
});
