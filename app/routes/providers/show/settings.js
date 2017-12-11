import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {

  model() {
    return this.store.findRecord('provider', this.modelFor('providers/show').get('id'));
  },

  afterModel(model) {
    if (!this.can('read provider', model)) {
      //let home = (this.get('currentUser.id')) ? this.get('currentUser').get('home') : '/';
      return this.transitionTo('index');
    }
  }
});
