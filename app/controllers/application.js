import { next } from '@ember/runloop';
import { observer } from '@ember/object';
import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  queryParams: ['jwt'],
  jwt: null,

  // binding the property on the paged array
  // to the query params on the controller
  page: alias("content.page[number]"),
  perPage: alias("content.page[size]"),
  total_pages: alias("content.total-pages"),

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
