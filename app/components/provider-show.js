import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';
import fetch from 'fetch';
import countryList from 'iso-3166-country-list';
import ENV from 'bracco/config/environment';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

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
  'provider',
  'consortium_lead',
  'consortium_organization',
  'contractual_provider',
  'for_profit_provider',
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

const Validations = buildValidations({
  confirmId: validator('confirmation', {
    on: 'symbol',
    message: 'Provider ID does not match'
  })
});

export default Component.extend(Validations, {
  currentUser: service(),
  store: service(),

  edit: false,
  change: false,
  delete: false,
  provider: null,
  confirmId: null,
  countryList,
  countries: null,
  organizationTypeList,
  organizationTypes: organizationTypeList,
  memberTypeList,
  memberTypes: memberTypeList,
  focusAreaList,
  focusAreas: focusAreaList,

  organizations: [],
  organizationsNames: [],
  consortiumLeads: [],

  twitterUrl: computed('model.twitterHandle', function() {
    if (this.model.get('twitterHandle')) {
      return 'https://twitter.com/' + this.model.get('twitterHandle').substr(1);
    } else {
      return null;
    }
  }),

  // didReceiveAttrs() {
  //   this._super(...arguments);
  //   let self = this;
  //   this.set('isBillingEmpty', Object.values(self.get('model.billingInformation')).some(this.hasEmptyBilling));
  // },

  didReceiveAttrs() {
    this._super(...arguments);

    this.searchConsortiumLead(null);
  },

  reset() {
    this.provider.set('passwordInput', null);
    this.set('edit', false);
    this.set('change', false);
    this.set('delete', false);
  },
  generate() {
    let self = this;
    let url = ENV.API_URL + '/random';
    fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + this.currentUser.get('jwt')
      }
    }).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          self.get('model').set('passwordInput', data.phrase);
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
  isBillingEmpty: computed('billingInformation', function() {
    return isEmpty(this.model.get('billingInformation.city')) &&
    isEmpty(this.model.get('billingInformation.postCode')) &&
    isEmpty(this.model.get('billingInformation.state')) &&
    isEmpty(this.model.get('billingInformation.department')) &&
    isEmpty(this.model.get('billingInformation.organization')) &&
    isEmpty(this.model.get('billingInformation.country')) &&
    isEmpty(this.model.get('billingInformation.address'));
  }),
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
  selectOrganization(rorId) {
    let self = this;
    let id = 'ror.org/' + rorId.substr(rorId.indexOf('0'));
    this.store.findRecord('organization', id).then((result) => {
      self.set('organization', result.name);
      self.provider.set('rorId','https://' + id);
      return result.name;
    });
  },
  searchConsortiumLead(query) {
    this.set('consortiumLeads', this.store.query('provider', { 'query': query, 'member-type': 'consortium_lead', sort: 'name', 'page[size]': 100 }));
  },
  selectConsortiumLead(consortiumLead) {
    this.provider.set('consortiumLead', consortiumLead)
  },
  selectBillingCountry(billingCountry) {
    this.provider.set('billingInformation.country', billingCountry);
    this.set('countries', countryList);
  },
  setBillingCountry(billingCountry) {
    this.set('billingInformationCountry', billingCountry);
    this.provider.set('billingInformationCountry', billingCountry);
    this.set('countries', countryList);
  },
  hasEmptyBilling(el){
    return el === ""
  },
  actions: {
    edit(provider) {
      this.set('provider', provider);
      this.provider.set('confirmSymbol', provider.get('symbol'));
      this.set('countries', countryList);
      this.set('edit', true);
      this.selectOrganization(provider.get('rorId'));
    },
    change(provider) {
      this.set('provider', provider);
      this.provider.set('confirmSymbol', provider.get('symbol'));
      this.provider.set('passwordInput', null);
      this.set('change', true);
    },
    generate() {
      this.generate();
    },
    delete(provider) {
      this.set('provider', provider);
      this.provider.set('confirmSymbol', null);
      this.set('delete', true);
    },
    setPassword() {
      let self = this;
      this.provider.set('keepPassword', false);
      this.provider.save().then(function () {
        self.reset();
      }).catch(function(reason){
        if (console.debug) {
          console.debug(reason);
        } else {
          console.log(reason);
        }
      });
    },
    submit(provider) {
      let self = this;

      provider.save().then(function () {
        self.reset();
      }).catch(function(reason){
        if (console.debug) {
          console.debug(reason);
        } else {
          console.log(reason);
        }
      });
    },
    destroy(provider) {
      let self = this;
      if (this.confirmId === provider.get('symbol')) {
        provider.destroyRecord().then(function () {
          self.router.transitionTo('/providers');
        }).catch(function(reason){
          if (console.debug) {
            console.debug(reason);
          } else {
            console.log(reason);
          }
        });
      }
    },
    cancel() {
      this.provider.rollbackAttributes();
      this.reset();
    },
    onSuccess() {
    },
    onError(error) {
      if (console.debug) {
        console.debug(error);
      } else {
        console.log(error);
      }
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
    searchConsortiumLead(query) {
      this.searchConsortiumLead(query);
    },
    selectConsortiumLead(provider) {
      this.selectConsortiumLead(provider);
    },
    searchFocusArea(query) {
      this.searchFocusArea(query);
    },
    selectFocusArea(focusArea) {
      this.selectFocusArea(focusArea);
    },
    selectBillingCountry(billingCountry) {
      this.selectBillingCountry(billingCountry);
    },
    searchOrganization(query) {
      let self = this;
      this.store.query('organization', { 'query': query }).then(function (orgs) {
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
