import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'region', 'year', 'page', 'perPage'],
  query: null,
  region: null,
  year: null
});
