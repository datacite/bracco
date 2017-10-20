import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findRecord('user', this.modelFor('users/show').get('id'));
  }
});
