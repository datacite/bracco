import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

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
