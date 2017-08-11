import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'organization', 'role', 'page[number]', 'page[size]']
});
