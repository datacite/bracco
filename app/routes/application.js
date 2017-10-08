import Ember from 'ember';
import ENV from 'bracco/config/environment';
import fetch from 'fetch';

export default Ember.Route.extend({
  intl: Ember.inject.service(),

  beforeModel() {
    /* NOTE: if you lazily load translations, here is also where you would load them via `intl.addTranslations` */
    return this.get('intl').setLocale(['en-us']);
  }
});
