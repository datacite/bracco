import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

@classic
export default class IndexController extends Controller {
  @service
  session;

  @service
  currentUser;

  init() {
    super.init(...arguments);
    if (this.session.sessionAuthenticated) {
      this._loadCurrentUser();
    }
  }
}
