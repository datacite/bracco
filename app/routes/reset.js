import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ResetRoute extends Route {
  @service
  router;

  @service
  session;

  beforeModel(transition) {
    this.session.prohibitAuthentication('index');
  }

  @action
  close() {
    this.router.transitionTo('index');
  }
}
