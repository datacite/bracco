import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    let provider = this.modelFor('providers/show');

    return hash({
      provider: this.store.findRecord('provider', provider.id),
      'provider-prefix': this.store.createRecord('provider-prefix', {
        provider
      })
    });
  }

  // setupController(controller, model) {
  //   this._super(controller, model);

  //   this.controllerFor('providers.show.prefixes.new').send(
  //     'searchPrefix',
  //     null
  //   );
  // }
});
