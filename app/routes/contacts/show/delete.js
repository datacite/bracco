import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class DeleteRoute extends Route {
  @service
  can;

  @service
  features;

  @service
  router;

  model() {
    return this.modelFor('contacts/show');
  }

  afterModel(model) {
    if (this.can.cannot('delete contact', model)) {
      this.router.transitionTo('providers.show', model);
    }
  }
}
