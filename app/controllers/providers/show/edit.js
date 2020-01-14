import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import countryList from 'iso-3166-country-list';

const organizationTypeList = [
  'researchInstitution',
  'academicInstitution',
  'governmentAgency',
  'nationalInstitution',
  'professionalSociety',
  'publisher',
  'serviceProvider',
  'other',
];
const memberTypeList = [
  'consortium',
  'consortium_organization',
  'contractual_member',
  'direct_member',
  'member_only',
  'registration_agency',
];
const focusAreaList = [
  'naturalSciences',
  'engineeringAndTechnology',
  'medicalAndHealthSciences',
  'agriculturalSciences',
  'socialSciences',
  'humanities',
  'general',
];

const nonProfitStatusList = [
  'non-profit',
  'for-profit',
];

export default Controller.extend({
  store: service(),

  countryList,
  countries: null,
  organizationTypeList,
  organizationTypes: organizationTypeList,
  memberTypeList,
  memberTypes: memberTypeList,
  focusAreaList,
  focusAreas: focusAreaList,
  nonProfitStatusList,
  nonProfitStatuses: nonProfitStatusList,
  organizations: [],

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
    searchOrganizationType(query) {
      let organizationTypes = organizationTypeList.filter(function(organizationType) {
        return organizationType.startsWith(query.toLowerCase());
      });
      this.set('organizationTypes', organizationTypes);
    },
    selectOrganizationType(organizationType) {
      this.model.set('organizationType', organizationType);
      this.set('organizationTypes', organizationTypeList);
    },
    searchMemberType(query) {
      let memberTypes = memberTypeList.filter(function(memberType) {
        return memberType.startsWith(query.toLowerCase());
      });
      this.set('memberTypes', memberTypes);
    },
    selectMemberType(memberType) {
      this.model.set('memberType', memberType);
      this.set('memberTypes', memberTypeList);
    },
    searchFocusArea(query) {
      let focusAreas = focusAreaList.filter(function(focusArea) {
        return focusArea.startsWith(query.toLowerCase());
      });
      this.set('focusAreas', focusAreas);
    },
    selectFocusArea(focusArea) {
      this.model.set('focusArea', focusArea);
      this.set('focusAreas', focusAreaList);
    },
    searchNonProfitStatus(query) {
      let nonProfitStatuses = nonProfitStatusList.filter(function(nonProfitStatus) {
        return nonProfitStatus.startsWith(query.toLowerCase());
      });
      this.set('nonProfitStatuses', nonProfitStatuses);
    },
    selectNonProfitStatus(nonProfitStatus) {
      this.model.set('nonProfitStatus', nonProfitStatus);
      this.set('nonProfitStatuses', nonProfitStatusList);
    },
    searchConsortium(query) {
      this.set('consortia', this.store.query('provider', { query, 'member-type': 'consortium', sort: 'name', 'page[size]': 100 }));
    },
    selectConsortium(consortium) {
      this.model.set('consortium', consortium);
    },
    selectBillingCountry(billingCountry) {
      this.model.set('billingInformation.country', billingCountry);
      this.set('countries', countryList);
    },
    setBillingCountry(billingCountry) {
      this.set('billingInformationCountry', billingCountry);
      this.model.set('billingInformationCountry', billingCountry);
      this.set('countries', countryList);
    },
    searchRor(query) {
      let self = this;
      this.store.query('ror', { query }).then(function(organizations) {
        self.set('organizations', organizations);
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
    submit() {
      let self = this;
      this.model.save().then(function(provider) {
        self.transitionToRoute('providers.show.settings', provider);
      }).catch(function(reason) {
        console.debug(reason);
      });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.transitionToRoute('providers.show.settings', this.model);
    },
  },
});
