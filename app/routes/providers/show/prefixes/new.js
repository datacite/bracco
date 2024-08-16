import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';

@classic
export default class NewRoute extends Route {
  @service
  can;

  @service
  router;

  @service
  store;

  model() {
    let provider = this.modelFor('providers/show');

    return hash({
      provider: this.store.findRecord('provider', provider.get('id')),
      'provider-prefix': this.store.createRecord('provider-prefix', {
        provider
      })
    });
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    this.controllerFor('providers.show.prefixes.new').send(
      'searchPrefixAction',
      null
    );
  }

  afterModel() {
    if (this.can.cannot('read index')) {
      this.router.transitionTo(
        'providers.show.prefixes',
        this.modelFor('providers/show')
      );
    }
  }
}
