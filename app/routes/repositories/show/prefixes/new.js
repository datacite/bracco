import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  router: service(),

  model() {
    let repository = this.modelFor('repositories/show');
    return hash({
      repository: this.store.findRecord('repository', repository.get('id')),
      'repository-prefix': this.store.createRecord('repositoryPrefix', {
        repository
      })
    });
  },

  setupController(controller, model) {
    this._super(controller, model);

    this.controllerFor('repositories.show.prefixes.new').send(
      'searchPrefix',
      null
    );
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    },
    refreshCurrentRoute() {
      this.refresh();
    }
  },

  afterModel() {
    if (this.can.cannot('read index')) {
      this.router.transitionTo(
        'repositories.show.prefixes',
        this.modelFor('repositories/show')
      );
    }
  }
});
