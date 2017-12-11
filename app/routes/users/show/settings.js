import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {

  model() {
    return this.store.findRecord('user', this.modelFor('users/show').get('id'));
  },

  afterModel(model) {
    if (!this.can('read user', model)) {
      //let home = (this.get('currentUser.id')) ? this.get('currentUser').get('home') : '/';
      return this.transitionTo('index');
    }
  },
});
