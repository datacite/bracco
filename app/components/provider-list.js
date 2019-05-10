import { inject as service } from '@ember/service';
import Component from '@ember/component';
import countryList from 'iso-3166-country-list';

const organizationTypeList = [
  'academicInstitution',
  'academicLibrary',
  'governmentAgency',
  'nationalInstitution',
  'nationalLibrary',
  'researchInstitution',
  'professionalSociety',
  'publisher',
  'serviceProvider',
  'vendor'
]
const focusAreaList = [
  'biomedicalAndHealthSciences',
  'earthSciences',
  'humanities',
  'mathematicsAndComputerScience',
  'physicalSciencesAndEngineering',
  'socialSciences',
  'general'
]

export default Component.extend({
  store: service(),

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

  organizations: [],
  organizationsNames: [],

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
    this.provider.set('country', country);
    this.set('countries', countryList);
  },
  searchOrganizationType(query) {
    var organizationTypes = organizationTypeList.filter(function(organizationType) {
      return organizationType.startsWith(query.toLowerCase());
    })
    this.set('organizationTypes', organizationTypes);
  },
  selectOrganizationType(organizationType) {
    this.provider.set('organizationType', organizationType);
    this.set('organizationTypes', organizationTypeList);
  },
  searchFocusArea(query) {
    var focusAreas = focusAreaList.filter(function(focusArea) {
      return focusArea.startsWith(query.toLowerCase());
    })
    this.set('focusAreas', focusAreas);
  },
  selectFocusArea(focusArea) {
    this.provider.set('focusArea', focusArea);
    this.set('focusAreas', focusAreaList);
  },

  actions: {
    new() {
      this.set('provider', this.store.createRecord('provider', { isActive: true }));
      this.set('countries', countryList);
      this.set('new', true);
    },
    submit(provider) {
      let self = this;

      this.provider.set('billingInformation', {
        address: this.provider.get('billingInformationAddress'),
        organization: this.provider.get('billingInformationOrganization'),
        department: this.provider.get('billingInformationDepartment'),
        city: this.provider.get('billingInformationCity'),
        state: this.provider.get('billingInformationState'),
        postCode: this.provider.get('billingInformationPostCode'),
        country: this.provider.get('billingInformationCountry')
      });

      console.log(provider)
      provider.save().then(function(provider) {
        self.router.transitionTo('providers.show.settings', provider.id);
        self.set('new', false);
      }).catch(function(reason){
        if (console.debug) {
          console.debug(reason);
        } else {
          console.log(reason);
        }
      });
    },
    cancel() {
      this.provider.rollbackAttributes();
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
    },
    selectBillingCountry(billingCountry) {
      this.provider.set('billingInformationCountry', billingCountry);
      this.set('countries', countryList);
    },
    searchOrganization(query) {
      let self = this;
      this.store.query('organization', { 'query': query, qp: 'multiMatch' }).then(function (orgs) {
        let organizations = orgs.toArray();
        let organizationsNames = orgs.mapBy('name');
        self.set('organizations', organizations);
        self.set('organizationsNames', organizationsNames);
        return organizationsNames;
      });
    },
    selectOrganization(organization) {
    
      let organizationRecord = this.get('organizations').findBy('name', organization);
     
      this.set('organization', organization);
      this.provider.set('rorId','https://'+organizationRecord.id);
    }
  }
});
