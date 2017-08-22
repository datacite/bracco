import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['metadata', 'citation'],
  metadata: null,
  citation: null
});
