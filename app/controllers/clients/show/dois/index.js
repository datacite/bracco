import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'resource-type-id', 'provider-id', 'client-id', 'prefix', 'year', 'state', 'sort', 'registered', 'schema-version', 'source', 'page', 'perPage'],
  query: null,
  'resource-type-id': null,
  'provider-id': null,
  'client-id': null,
  prefix: null,
  year: null,
  registered: null,
  state: null,
  source: null,
  sort: null,
  'schema-version': null
});
