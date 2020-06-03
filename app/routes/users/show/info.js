import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    let self = this;
    return this.store.findRecord('user', this.modelFor('users/show').get('id')).then(function(user) {
      return user;
    }).catch(function(reason) {
      console.debug(reason);

      self.get('flashMessages').warning('We have not found Datasets with the ORCID record you are looking. Please visit the repository where your resources are deposited and include the ORCID record there.');
      self.transitionTo('/');
    });
  },

  afterModel() {
    if (this.can.cannot('read user', this.modelFor('users/show'))) {
      this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    },
  },
});
