import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  can: service(),
  features: service(),
  flashMessages: service(),
  headData: service(),

  model(params) {
    let self = this;
    return this.store
      .findRecord('repository', params.repository_id, { include: 'provider' })
      .then(function (repository) {
        self.headData.set('title', repository.name);
        self.headData.set('description', repository.description);
        self.headData.set('image', repository.badgeUrl);

        return repository;
      })
      .catch(function (reason) {
        console.debug(reason);

        self.get('flashMessages').warning(reason);
        self.transitionTo('index');
      });
  },

  afterModel(model) {
    if (this.can.cannot('read repository', model)) {
      this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
