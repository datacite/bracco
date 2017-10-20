import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findRecord('user', this.modelFor('users/show').get('id'));
  },

  afterModel(model, transition) {
    if (!this.can('read user', model)) {
      let home = (this.get('currentUser.id')) ? this.get('currentUser').get('home') : '/';
      return this.transitionTo(home);
    }
  },
});
