import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'year', 'provider-id', 'include-deleted', 'sort', 'page', 'perPage'],
  query: null,
  year: null,
  'provider-id': null,
  'include-deleted': null,
  sort: null
});
