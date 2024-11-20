import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  @service
  session;

  queryParams = ['jwt'];
  jwt = null;

  @action
  invalidateSession() {
    this.session.invalidate();
  }
}

// import ApplicationController from './application';

// ApplicationController.reopen({
//   unsetToken: observer('jwt', function() {
//     if (this.jwt) {
//       next(this, function() {
//         this.set('jwt', null);
//       });
//     }
//   }),
// });
