import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import countryList from 'iso-3166-country-list';

export default Controller.extend({
  store: service(),

  countryList,
  countries: null,

  actions: {
    searchCountry(query) {
      let countries = countryList.filter(function(country) {
        return country.name.toLowerCase().startsWith(query.toLowerCase());
      });
      this.set('countries', countries);
    },
    selectCountry(country) {
      this.model.set('country', country);
      this.set('countries', countryList);
    },
    searchRor(query) {
      let self = this;
      this.store.query('ror', { query }).then(function(organizations) {
        self.model.set('organizations', organizations);
      });
    },
    selectRor(ror) {
      if (ror) {
        this.model.set('rorId', ror.id);
        this.model.set('name', ror.name);
        this.model.set('displayName', ror.name);
      } else {
        this.model.set('rorId', null);
      }
    },
    submit(provider) {
      let self = this;
      provider.save().then(function() {
        self.transitionToRoute('settings');
      }).catch(function(reason) {
        console.debug(reason);
      });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.transitionToRoute('settings');
    },
  },
});
