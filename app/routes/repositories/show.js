import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  can: service(),
  features: service(),
  flashMessages: service(),
  headData: service(),
  router: service(),
  store: service(),

  model(params) {
    let self = this;

    return this.store
      .findRecord('repository', params.repository_id.toLowerCase(), {
        include: 'provider,prefixes'
      })
      .then(function (repository) {
        self.headData.set('title', repository.name);
        self.headData.set('description', repository.description);
        self.headData.set('image', repository.badgeUrl);

        return repository;
      })
      .catch(function (reason) {
        console.debug(reason);

        self.get('flashMessages').warning(reason);
        self.router.transitionTo('index');
      });
  },

  afterModel(model) {
    if (this.can.cannot('read repository', model)) {
      this.router.transitionTo('index');
    } else {
      if (this.paramsFor(this.routeName).assignedPrefix) {
        this.flashMessages.success(
          'Assigned prefix is: ' + this.paramsFor(this.routeName).assignedPrefix
        );
      }
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
