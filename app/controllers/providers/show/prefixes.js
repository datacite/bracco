import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'client-id', 'year', 'state', 'sort', 'page', 'perPage'],
  query: null,
  'client-id': null,
  year: null,
  state: null,
  sort: null
});
