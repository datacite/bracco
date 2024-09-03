import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import BaseSessionService from 'ember-simple-auth/services/session';

@classic
export default class Session extends BaseSessionService {
  @service
  store;

  @service
  currentUser;

  async handleAuthentication() {
    try {
      super.handleAuthentication(...arguments);
      await this.currentUser.load();
    } catch (err) {
      await this.invalidate();
    }
  }
}
