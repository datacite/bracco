import Ember from 'ember';
import countryList from 'npm:iso-3166-country-list';
const organizationTypeList = [
  'academic_institution',
  'academic_library',
  'government_agency',
  'national_institution',
  'national_library',
  'research_institution',
  'professional_society',
  'publisher',
  'service_provider',
  'vendor'
]
const focusAreaList = [
  'biomedical_and_health_sciences',
  'earth_sciences',
  'humanities',
  'mathematics_and_computer_science',
  'physical_sciences_and_engineering',
  'social_sciences',
  'general'
]

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  provider: null,
  new: false,
  countryList,
  countries: null,
  organizationTypeList,
  organizationTypes: organizationTypeList,
  focusAreaList,
  focusAreas: focusAreaList,

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
  searchOrganizationType(query) {
    var organizationTypes = organizationTypeList.filter(function(organizationType) {
      return organizationType.startsWith(query.toLowerCase());
    })
    this.set('organizationTypes', organizationTypes);
  },
  selectOrganizationType(organizationType) {
    this.get('provider').set('organizationType', organizationType);
    this.set('organizationTypes', organizationTypeList);
  },
  searchFocusArea(query) {
    var focusAreas = focusAreaList.filter(function(focusArea) {
      return focusArea.startsWith(query.toLowerCase());
    })
    this.set('focusAreas', focusAreas);
  },
  selectFocusArea(focusArea) {
    this.get('provider').set('focusArea', focusArea);
    this.set('focusAreas', focusAreaList);
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
      this.get('provider').rollbackAttributes();
      this.reset();
    },
    searchCountry(query) {
      this.searchCountry(query);
    },
    selectCountry(country) {
      this.selectCountry(country);
    },
    searchOrganizationType(query) {
      this.searchOrganizationType(query);
    },
    selectOrganizationType(organizationType) {
      this.selectOrganizationType(organizationType);
    },
    searchFocusArea(query) {
      this.searchFocusArea(query);
    },
    selectFocusArea(focusArea) {
      this.selectFocusArea(focusArea);
    }
  }
});
