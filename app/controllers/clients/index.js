import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'year', 'provider-id', 'page', 'perPage'],
  query: null,
  year: null,
  'member-id': null
});
