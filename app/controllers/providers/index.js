import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'region', 'year', 'sort', 'page', 'perPage'],
  query: null,
  region: null,
  year: null,
  sort: null
});
