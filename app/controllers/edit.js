import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import countryList from 'iso-3166-country-list';

export default Controller.extend({
  store: service(),
  router: service(),

  countryList,
  countries: null,

  actions: {
    searchCountry(query) {
      let countries = countryList.filter(function (country) {
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
      this.store
        .query('ror', { query })
        .then(function (organizations) {
          self.set('organizations', organizations);
        })
        .catch(function (reason) {
          console.debug(reason);
          self.set('organizations', []);
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
      this.set('organizations', []);
    },
    submit(provider) {
      let self = this;
      provider
        .save()
        .then(function () {
          self.router.transitionTo('index');
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.router.transitionTo('index');
    }
  }
});
