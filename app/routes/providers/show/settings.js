import Route from '@ember/routing/route';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, {

  model() {
    return this.store.findRecord('provider', this.modelFor('providers/show').get('id'));
  },

  afterModel(model) {
    if (!this.can('read provider', model)) {
      return this.transitionTo('index');
    }
  }
});
