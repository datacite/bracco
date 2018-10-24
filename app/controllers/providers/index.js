import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'region', 'organization-type', 'focus-area', 'year', 'sort', 'page', 'perPage'],
  query: null,
  region: null,
  'organization-type': null,
  'focus-area': null,
  year: null,
  sort: null
});
