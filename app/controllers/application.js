import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service(),

  queryParams: ['jwt'],
  jwt: null,

  // binding the property on the paged array
  // to the query params on the controller
  page: Ember.computed.alias("content.page[number]"),
  perPage: Ember.computed.alias("content.page[size]"),
  total_pages: Ember.computed.alias("content.total-pages"),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});

import ApplicationController from './application';

ApplicationController.reopen({
  unsetToken: Ember.observer('jwt', function() {
    if (this.get('jwt')) {
      Ember.run.next(this, function() {
        this.set('jwt', null);
      });
    }
  })
});
