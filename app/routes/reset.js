import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  router: service(),
  session: service(),

  beforeModel(transition) {
    this.session.prohibitAuthentication('index');
  },
  actions: {
    close() {
      this.router.transitionTo('index');
    }
  }
});
