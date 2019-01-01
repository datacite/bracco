import { next } from '@ember/runloop';
import { observer } from '@ember/object';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  queryParams: ['jwt'],
  jwt: null,

  actions: {
    invalidateSession() {
      this.session.invalidate();
    }
  }
});

import ApplicationController from './application';

ApplicationController.reopen({
  unsetToken: observer('jwt', function() {
    if (this.jwt) {
      next(this, function() {
        this.set('jwt', null);
      });
    }
  })
});
