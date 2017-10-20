import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  model() {
    return this.store.findRecord('client', this.modelFor('clients/show').get('id'), { include: 'provider,repository' });
  },

  // afterModel(model, transition) {
  //   if (!this.can('read data-center', model)) {
  //     let home = this.get('currentUser').get('home');
  //     this.transitionTo(home);
  //   }
  // },

  afterModel() {
    if (!this.can('read client', this.modelFor('clients/show'))) {
      let home = (this.get('currentUser.id')) ? this.get('currentUser').get('home') : '/';
      return this.transitionTo(home);
    }
  },

  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
