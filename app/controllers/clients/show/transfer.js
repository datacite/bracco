import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'provider-id', 'page', 'perPage'],
  query: null,
  'provider-id': null
});
