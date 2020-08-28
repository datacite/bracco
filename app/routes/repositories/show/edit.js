import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    let repository = this.modelFor('repositories/show');
    repository.set('confirmSymbol', repository.get('symbol'));
    return repository;
  },

  afterModel() {
    if (this.can.cannot('update repository', this.modelFor('repositories/show'))) {
      this.transitionTo('index');
    } else {
      this.flashMessages.warning('The contacts entered may receive notifications about training sessions, webinars, product testing, or news that will impact the use of DataCite services. Individuals may remove themselves from mailings by following the unsubscribe link provided in every DataCite email. For information about our privacy practices and commitment to protecting your privacy, please review our Privacy Policy.', {
        sticky: true,
      });
    }
  },
});
