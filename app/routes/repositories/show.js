import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class ShowRoute extends Route {
  @service
  can;

  @service
  features;

  @service
  flashMessages;

  @service
  headData;

  @service
  router;

  @service
  store;

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
  }

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
  }

  @action
  queryParamsDidChange() {
    this.refresh();
  }
}
