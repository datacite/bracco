import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'resource-type-id', 'provider-id', 'client-id', 'year', 'registered', 'state', 'sort', 'schema-version', 'page', 'perPage'],
  query: null,
  'resource-type-id': null,
  'provider-id': null,
  'client-id': null,
  year: null,
  registered: null,
  state: null,
  sort: null,
  'schema-version': null
});
