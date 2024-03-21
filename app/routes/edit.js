import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  router: service(),
  store: service(),

  model() {
    let self = this;
    return this.store
      .findRecord('provider', 'admin')
      .then(function (model) {
        model.set('confirmSymbol', model.get('symbol'));
        return model;
      })
      .catch(function (reason) {
        console.debug(reason);

        self.get('flashMessages').warning(reason);
      });
  },

  afterModel() {
    if (this.can.cannot('read index')) {
      this.router.transitionTo('index');
    }
  }
});
