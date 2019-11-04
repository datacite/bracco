import { inject as service } from '@ember/service';
import Component from '@ember/component';
import countryList from 'iso-3166-country-list';
import ENV from 'bracco/config/environment';

const organizationTypeList = [
  'researchInstitution',
  'academicInstitution',
  'governmentAgency',
  'nationalInstitution',
  'professionalSociety',
  'publisher',
  'serviceProvider',
  'other'
]
const memberTypeList = [
  'consortium',
  'consortium_organization',
  'contractual_member',
  'direct_member',
  'member_only',
  'registration_agency'
]
const focusAreaList = [
  'naturalSciences',
  'engineeringAndTechnology',
  'medicalAndHealthSciences',
  'agriculturalSciences',
  'socialSciences',
  'humanities',
  'general'
]

const nonProfitStatusList = [
  'non-profit',
  'for-profit'
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
  memberTypeList,
  memberTypes: memberTypeList,
  focusAreaList,
  focusAreas: focusAreaList,
  organizations: [],

  generate() {
    let self = this;
    let url = ENV.API_URL + '/providers/random';
    fetch(url).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          self.get('provider').set('symbol', data.symbol);
        });
      } else {
        if (console.debug) {
          console.debug(response);
        } else {
          console.log(response);
        }
      }
    }).catch(function(error) {
      if (console.debug) {
        console.debug(error);
      } else {
        console.log(error);
      }
    });
  },
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
  searchMemberType(query) {
    var memberTypes = memberTypeList.filter(function(memberType) {
      return memberType.startsWith(query.toLowerCase());
    })
    this.set('memberTypes', memberTypes);
  },
  selectMemberType(memberType) {
    this.provider.set('memberType', memberType);
    this.set('memberTypes', memberTypeList);
  },
  searchConsortium(query) {
    this.set('consortia', this.store.query('provider', { 'query': query, 'member-type': 'consortium', sort: 'name', 'page[size]': 100 }));
  },
  selectConsortium(consortium) {
    this.provider.set('consortium', consortium)
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
  searchNonProfitStatus(query) {
    var nonProfitStatuses = nonProfitStatusList.filter(function(nonProfitStatus) {
      return nonProfitStatus.startsWith(query.toLowerCase());
    })
    this.set('nonProfitStatuses', nonProfitStatuses);
  },
  selectNonProfitStatus(nonProfitStatus) {
    this.provider.set('nonProfitStatus', nonProfitStatus);
    this.set('nonProfitStatuses', nonProfitStatusList);
  },
  selectBillingCountry(billingCountry) {
    this.provider.set('billingInformationCountry', billingCountry);
    this.provider.set('billingInformation.country', billingCountry);
    this.set('countries', countryList);
  },

  actions: {
    new() {
      this.set('provider', this.store.createRecord('provider', { billingInformation: {}, technicalContact: {}, isActive: true }));
      this.set('countries', countryList);
      this.generate();
      this.set('new', true);
    },
    submit(provider) {
      let self = this;

      // this.provider.set('billingInformation', {
      //   address: this.provider.get('billingInformationAddress'),
      //   organization: this.provider.get('billingInformationOrganization'),
      //   department: this.provider.get('billingInformationDepartment'),
      //   city: this.provider.get('billingInformationCity'),
      //   state: this.provider.get('billingInformationState'),
      //   postCode: this.provider.get('billingInformationPostCode'),
      //   country: this.provider.get('billingInformationCountry')
      // });

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
    refresh() {
      this.generate();
    },
    clear() {
      this.provider.set('symbol', null)
      //this.$('input[type=text]:first').focus();
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
    searchMemberType(query) {
      this.searchMemberType(query);
    },
    selectMemberType(memberType) {
      this.selectMemberType(memberType);
    },
    searchConsortium(query) {
      this.searchConsortium(query);
    },
    selectConsortium(provider) {
      this.selectConsortium(provider);
    },
    searchFocusArea(query) {
      this.searchFocusArea(query);
    },
    selectFocusArea(focusArea) {
      this.selectFocusArea(focusArea);
    },
    searchNonProfitStatus(query) {
      this.searchNonProfitStatus(query);
    },
    selectNonProfitStatus(nonProfitStatus) {
      this.selectNonProfitStatus(nonProfitStatus);
    },
    selectBillingCountry(billingCountry) {
      this.selectBillingCountry(billingCountry);
    },
    searchRor(query) {
      let self = this;
      this.store.query('ror', { 'query': query }).then(function (organizations) {
        self.set('organizations', organizations);
      });
    },
    selectRor(ror) {
      if (ror) {
        this.provider.set('rorId', ror.id);
        this.provider.set('name', ror.name);
        this.provider.set('displayName', ror.name);
      } else {
        this.provider.set('rorId', null);
      }
    }
  }
});
