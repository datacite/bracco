import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'member-type', 'region', 'year', 'page', 'perPage'],
  query: ''
});
