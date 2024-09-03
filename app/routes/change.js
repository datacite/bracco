import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class ChangeRoute extends Route {
  @service
  can;

  @service
  router;

  @service
  store;

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
  }

  afterModel() {
    if (this.can.cannot('read index')) {
      this.router.transitionTo('index');
    }
  }
}
