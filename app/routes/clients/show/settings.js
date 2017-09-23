import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  model() {
    return this.store.findRecord('client', this.modelFor('clients/show').get('id'), { include: 'provider' });
  },

  // afterModel(model, transition) {
  //   if (!this.can('read data-center', model)) {
  //     let home = this.get('currentUser').get('home');
  //     this.transitionTo(home);
  //   }
  // },

  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
