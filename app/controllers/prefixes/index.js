import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'provider-id', 'client-id', 'year', 'state', 'page', 'perPage'],
  query: null,
  'provider-id': null,
  'client-id': null,
  year: null,
  state: null
});
