import Ember from 'ember';
import countryList from 'npm:iso-3166-country-list';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  provider: null,
  new: false,
  countryList,
  countries: null,

  reset() {
    this.set('provider', null);
    this.set('new', false);
  },
  searchCountry(query) {
    var countries = countryList.filter(function(country) {
      return country.name.toLowerCase().startsWith(query.toLowerCase());
    })
    this.set('countries', countries);
  },
  selectCountry(country) {
    this.get('provider').set('country', country);
    this.set('countries', countryList);
  },

  actions: {
    new() {
      this.set('provider', this.get('store').createRecord('provider', { isActive: true }));
      this.set('countries', countryList);
      this.set('new', true);
    },
    submit(provider) {
      let self = this;
      provider.save().then(function(provider) {
        self.get('router').transitionTo('providers.show.settings', provider.id);
        self.set('new', false);
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    cancel() {
      this.get('provider').deleteRecord();
      this.reset();
    },
    searchCountry(query) {
      this.searchCountry(query);
    },
    selectCountry(country) {
      this.selectCountry(country);
    }
  }
});
