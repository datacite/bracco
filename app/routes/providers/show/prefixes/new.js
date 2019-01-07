import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, {
  model() {
    let provider = this.modelFor('providers/show');

    return hash({
      provider: this.store.findRecord('provider', provider.get('id')),
      prefix: this.store.createRecord('provider-prefix', { provider: provider })
    });
  }
});

