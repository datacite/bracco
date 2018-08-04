import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'resource-type-id', 'provider-id', 'client-id', 'prefix', 'year', 'created', 'state', 'sort', 'source', 'schema-version', 'page', 'perPage'],
  query: null,
  'resource-type-id': null,
  'provider-id': null,
  'client-id': null,
  prefix: null,
  year: null,
  created: null,
  state: null,
  source: null,
  sort: null,
  'schema-version': null
});
