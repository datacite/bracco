import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'provider-id', 'client-id', 'year', 'state', 'sort', 'page', 'perPage'],
  query: null,
  'provider-id': null,
  'client-id': null,
  year: null,
  state: null,
  sort: null
});
