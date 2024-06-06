import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class EditRoute extends Route {
  @service
  can;

  @service
  features;

  @service
  router;

  model() {
    let provider = this.modelFor('providers/show');
    provider.set('confirmSymbol', provider.get('symbol'));
    return provider;
  }

  afterModel(model) {
    if (this.can.cannot('read provider', model)) {
      this.router.transitionTo('index');
    }
  }
}
