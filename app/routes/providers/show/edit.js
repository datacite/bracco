import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  features: service(),

  model() {
    let provider = this.modelFor('providers/show');
    provider.set('confirmSymbol', provider.get('symbol'));
    return provider;
  },

  afterModel(model) {
    if (this.can.cannot('read provider', model)) {
      this.transitionTo('index');
    } else {
      this.flashMessages.warning('The contacts entered may receive notifications about training sessions, webinars, product testing, or news that will impact the use of DataCite services. Individuals may remove themselves from mailings by following the unsubscribe link provided in every DataCite email. For information about our privacy practices and commitment to protecting your privacy, please review our Privacy Policy.', {
        sticky: true,
      });
    }
  },
});
