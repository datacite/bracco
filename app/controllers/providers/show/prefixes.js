import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'client-id', 'year', 'state', 'page', 'perPage'],
  query: null,
  'client-id': null,
  year: null,
  state: null
});
