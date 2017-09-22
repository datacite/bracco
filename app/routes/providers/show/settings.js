import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.store.findRecord('provider', this.modelFor('providers/show').get('id'));
  }
});
