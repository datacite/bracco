import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import countryList from 'iso-3166-country-list';

export default class EditController extends Controller {
  @service
  store;

  @service
  router;

  countryList = countryList;
  countries = null;

  @action
  searchCountry(query) {
    let countries = countryList.filter(function (country) {
      return country.name.toLowerCase().startsWith(query.toLowerCase());
    });
    this.set('countries', countries);
  }

  @action
  selectCountry(country) {
    this.model.set('country', country);
    this.set('countries', countryList);
  }

  @action
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
  }

  @action
  selectRor(ror) {
    if (ror) {
      this.model.set('rorId', ror.id);
      this.model.set('name', ror.name);
      this.model.set('displayName', ror.name);
    } else {
      this.model.set('rorId', null);
    }
    this.set('organizations', []);
  }

  @action
  submitAction(provider) {
    let self = this;
    provider
      .save()
      .then(function () {
        self.router.transitionTo('index');
      })
      .catch(function (reason) {
        console.debug(reason);
      });
  }

  @action
  cancelAction() {
    this.model.rollbackAttributes();
    this.router.transitionTo('index');
  }
}
