import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { w } from '@ember/string';
import countryList from 'iso-3166-country-list';
import FileReader from 'ember-file-upload/system/file-reader';
import ENV from 'bracco/config/environment';
import { organizationTypeList, memberTypeList, focusAreaList, nonProfitStatusList } from 'bracco/models/provider';

// states and provinces use iso-3166-2 codes
const stateList = [
  { code: 'US-AL', name: 'Alabama' },
  { code: 'US-AK', name: 'Alaska' },
  { code: 'US-AZ', name: 'Arizona' },
  { code: 'US-AR', name: 'Arkansas' },
  { code: 'US-CA', name: 'California' },
  { code: 'US-CO', name: 'Colorado' },
  { code: 'US-CT', name: 'Connecticut' },
  { code: 'US-DE', name: 'Delaware' },
  { code: 'US-FL', name: 'Florida' },
  { code: 'US-GA', name: 'Georgia' },
  { code: 'US-HI', name: 'Hawaii' },
  { code: 'US-ID', name: 'Idaho' },
  { code: 'US-IL', name: 'Illinois' },
  { code: 'US-IN', name: 'Indiana' },
  { code: 'US-IA', name: 'Iowa' },
  { code: 'US-KS', name: 'Kansas' },
  { code: 'US-KY', name: 'Kentucky' },
  { code: 'US-LA', name: 'Louisiana' },
  { code: 'US-ME', name: 'Maine' },
  { code: 'US-MD', name: 'Maryland' },
  { code: 'US-MA', name: 'Massachusetts' },
  { code: 'US-MI', name: 'Michigan' },
  { code: 'US-MN', name: 'Minnesota' },
  { code: 'US-MS', name: 'Mississippi' },
  { code: 'US-MO', name: 'Missouri' },
  { code: 'US-MT', name: 'Montana' },
  { code: 'US-NE', name: 'Nebraska' },
  { code: 'US-NV', name: 'Nevada' },
  { code: 'US-NH', name: 'New Hampshire' },
  { code: 'US-NJ', name: 'New Jersey' },
  { code: 'US-NM', name: 'New Mexico' },
  { code: 'US-NY', name: 'New York' },
  { code: 'US-NC', name: 'North Carolina' },
  { code: 'US-ND', name: 'North Dakota' },
  { code: 'US-OH', name: 'Ohio' },
  { code: 'US-OK', name: 'Oklahoma' },
  { code: 'US-OR', name: 'Oregon' },
  { code: 'US-PA', name: 'Pennsylvania' },
  { code: 'US-RI', name: 'Rhode Island' },
  { code: 'US-SC', name: 'South Carolina' },
  { code: 'US-SD', name: 'South Dakota' },
  { code: 'US-TN', name: 'Tennessee' },
  { code: 'US-TX', name: 'Texas' },
  { code: 'US-UT', name: 'Utah' },
  { code: 'US-VT', name: 'Vermont' },
  { code: 'US-VA', name: 'Virginia' },
  { code: 'US-WA', name: 'Washington' },
  { code: 'US-WV', name: 'West Virginia' },
  { code: 'US-WI', name: 'Wisconsin' },
  { code: 'US-WY', name: 'Wyoming' },
  { code: 'US-DC', name: 'District of Columbia' },
  { code: 'US-AS', name: 'American Samoa' },
  { code: 'US-GU', name: 'Guam' },
  { code: 'US-MP', name: 'Northern Mariana Islands' },
  { code: 'US-PR', name: 'Puerto Rico' },
  { code: 'US-UM', name: 'United States Minor Outlying Islands' },
  { code: 'US-VI', name: 'Virgin Islands, U.S.' }
];

const provinceListCanada = [
  { code: 'CA-AB', name: 'Alberta' },
  { code: 'CA-BC', name: 'British Columbia (Colombie-Britannique)' },
  { code: 'CA-MB', name: 'Manitoba' },
  { code: 'CA-NB', name: 'New Brunswick (Nouveau-Brunswick)' },
  { code: 'CA-NL', name: 'Newfoundland and Labrador (Terre-Neuve)' },
  { code: 'CA-NS', name: 'Nova Scotia (Nouvelle-Écosse)' },
  { code: 'CA-ON', name: 'Ontario' },
  { code: 'CA-PE', name: 'Prince Edward Island (Île-du-Prince-Édouard)' },
  { code: 'CA-QC', name: 'Quebec (Québec)' },
  { code: 'CA-SK', name: 'Saskatchewan' },
  { code: 'CA-NT', name: 'Northwest Territories (Territoires du Nord-Ouest)' },
  { code: 'CA-NU', name: 'Nunavut' },
  { code: 'CA-YT', name: 'Yukon Territory (Teritoire du Yukon)' }
];

const provinceListChina = [
  { code: 'CN-34', name: 'Anhui' },
  { code: 'CN-11', name: 'Beijing' },
  { code: 'CN-50', name: 'Chongqing' },
  { code: 'CN-35', name: 'Fujian' },
  { code: 'CN-62', name: 'Gansu' },
  { code: 'CN-44', name: 'Guangdong' },
  { code: 'CN-45', name: 'Guangxi' },
  { code: 'CN-52', name: 'Guizhou' },
  { code: 'CN-46', name: 'Hainan' },
  { code: 'CN-13', name: 'Hebei' },
  { code: 'CN-23', name: 'Heilongjiang' },
  { code: 'CN-41', name: 'Henan' },
  { code: 'CN-91', name: 'Hong Kong' },
  { code: 'CN-42', name: 'Hubei' },
  { code: 'CN-43', name: 'Hunan' },
  { code: 'CN-32', name: 'Jiangsu' },
  { code: 'CN-36', name: 'Jiangxi' },
  { code: 'CN-22', name: 'Jilin' },
  { code: 'CN-21', name: 'Liaoning' },
  { code: 'CN-15', name: 'Nei Monggol' },
  { code: 'CN-64', name: 'Ningxia' },
  { code: 'CN-63', name: 'Qinghai' },
  { code: 'CN-61', name: 'Shaanxi' },
  { code: 'CN-37', name: 'Shandong' },
  { code: 'CN-31', name: 'Shanghai' },
  { code: 'CN-14', name: 'Shanxi' },
  { code: 'CN-51', name: 'Sichuan' },
  { code: 'CN-71', name: 'Taiwan' },
  { code: 'CN-12', name: 'Tianjin' },
  { code: 'CN-65', name: 'Xinjiang' },
  { code: 'CN-54', name: 'Xizang' },
  { code: 'CN-53', name: 'Yunnan' },
  { code: 'CN-33', name: 'Zhejiang' }
];

const stateListAustralia = [
  { code: 'AU-NSW', name: 'New South Wales' },
  { code: 'AU-QLD', name: 'Queensland' },
  { code: 'AU-SA', name: 'South Australia' },
  { code: 'AU-TAS', name: 'Tasmania' },
  { code: 'AU-VIC', name: 'Victoria' },
  { code: 'AU-WA', name: 'Western Australia' },
  { code: 'AU-ACT', name: 'Australian Capital Territory' },
  { code: 'AU-NT', name: 'Northern Territory' }
];

export default Controller.extend({
  store: service(),
  features: service(),

  countryList,
  countries: null,
  stateList,
  provinceListCanada,
  provinceListChina,
  stateListAustralia,
  states: null,
  organizationTypeList,
  organizationTypes: organizationTypeList,
  memberTypeList,
  memberTypes: memberTypeList,
  focusAreaList,
  focusAreas: focusAreaList,
  nonProfitStatusList,
  nonProfitStatuses: nonProfitStatusList,
  // we are storing state/province information for US, CA, AU and CN
  showStateSearch: computed('model.billingInformation.country', function () {
    return (
      this.model.get('billingInformation.country') &&
      w('US CA AU CN').includes(
        this.model.get('billingInformation.country.code')
      )
    );
  }),

  init(...args) {
    this._super(...args);

    this.organizations = this.organizations || [];
  },

  actions: {
    toggleInput() {
      let estimate = this.model.get('doiEstimate');

      this.model.set('doiEstimate', '0');
      this.model.set('doiEstimate', estimate);
    },
    searchCountry(query) {
      let countries = countryList.filter(function (country) {
        return country.name.toLowerCase().startsWith(query.toLowerCase());
      });
      this.set('countries', countries);
    },
    selectCountry(country) {
      this.model.set('country', {
        code: country.code,
        name: countryList.name(country.code)
      });
      this.set('countries', countryList);
    },
    searchState(query) {
      let states = null;
      if (this.model.get('billingInformation.country.code') === 'US') {
        states = stateList.filter(function (state) {
          return state.name.toLowerCase().startsWith(query.toLowerCase());
        });
      } else if (this.model.get('billingInformation.country.code') === 'CA') {
        states = provinceListCanada.filter(function (state) {
          return state.name.toLowerCase().startsWith(query.toLowerCase());
        });
      } else if (this.model.get('billingInformation.country.code') === 'CN') {
        states = provinceListChina.filter(function (state) {
          return state.name.toLowerCase().startsWith(query.toLowerCase());
        });
      } else if (this.model.get('billingInformation.country.code') === 'AU') {
        states = stateListAustralia.filter(function (state) {
          return state.name.toLowerCase().startsWith(query.toLowerCase());
        });
      }
      this.set('states', states);
    },
    searchOrganizationType(query) {
      let organizationTypes = organizationTypeList.filter(function (
        organizationType
      ) {
        return organizationType.startsWith(query.toLowerCase());
      });
      this.set('organizationTypes', organizationTypes);
    },
    selectOrganizationType(organizationType) {
      this.model.set('organizationType', organizationType);
      this.set('organizationTypes', organizationTypeList);
    },
    searchMemberType(query) {
      let memberTypes = memberTypeList.filter(function (memberType) {
        return memberType.startsWith(query.toLowerCase());
      });
      this.set('memberTypes', memberTypes);
    },
    selectMemberType(memberType) {
      this.model.set('memberType', memberType);
      this.set('memberTypes', memberTypeList);
      if (this.features.isEnabled('enable-doi-estimate')) {
        this.send('toggleInput');
      }
    },
    searchFocusArea(query) {
      let focusAreas = focusAreaList.filter(function (focusArea) {
        return focusArea.startsWith(query.toLowerCase());
      });
      this.set('focusAreas', focusAreas);
    },
    selectFocusArea(focusArea) {
      this.model.set('focusArea', focusArea);
      this.set('focusAreas', focusAreaList);
    },
    searchNonProfitStatus(query) {
      let nonProfitStatuses = nonProfitStatusList.filter(function (
        nonProfitStatus
      ) {
        return nonProfitStatus.startsWith(query.toLowerCase());
      });
      this.set('nonProfitStatuses', nonProfitStatuses);
    },
    selectNonProfitStatus(nonProfitStatus) {
      this.model.set('nonProfitStatus', nonProfitStatus);
      this.set('nonProfitStatuses', nonProfitStatusList);
    },
    searchConsortium(query) {
      let self = this;
      this.store
        .query('provider', {
          query,
          'member-type': 'consortium',
          sort: 'name',
          'page[size]': 100
        })
        .then(function (consortia) {
          self.set('consortia', consortia);
        })
        .catch(function (reason) {
          console.debug(reason);
          self.set('consortia', []);
        });
    },
    selectConsortium(consortium) {
      this.model.set('consortium', consortium);
    },
    selectBillingCountry(billingCountry) {
      if (billingCountry) {
        this.model.set('billingInformation.country', {
          code: billingCountry.code,
          name: countryList.name(billingCountry.code)
        });
      } else {
        this.model.set('billingInformation.country', null);
      }
      this.model.set('billingInformation.state', null);
      this.set('countries', countryList);
    },
    selectBillingState(billingState) {
      this.model.set('billingInformation.state', billingState);
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
    didSelectFiles(file) {
      let reader = new FileReader();
      let self = this;

      reader.readAsDataURL(file.blob).then(
        (logo) => {
          self.get('model').set('logo', logo);
        },
        (err) => {
          console.error(err);
        }
      );
    },
    searchContact(query) {
      let filteredContacts = this.model.contacts.filter(function (contact) {
        console.log(contact.displayName.toLowerCase);
        return contact.displayName
          .toLowerCase()
          .startsWith(query.toLowerCase());
      });
      this.model.set('filteredContacts', filteredContacts);
    },
    selectVotingContact(contact) {
      if (contact) {
        let votingContact = {
          givenName: contact.givenName,
          familyName: contact.familyName,
          displayName: contact.displayName,
          email: contact.email
        };
        this.model.set('votingContact', votingContact);
        this.model.set('filteredContacts', this.model.contacts);
      }
    },
    selectServiceContact(contact) {
      if (contact) {
        let serviceContact = {
          givenName: contact.givenName,
          familyName: contact.familyName,
          displayName: contact.displayName,
          email: contact.email
        };
        this.model.set('serviceContact', serviceContact);
        this.model.set('filteredContacts', this.model.contacts);
      }
    },
    selectSecondaryServiceContact(contact) {
      if (contact) {
        let secondaryServiceContact = {
          givenName: contact.givenName,
          familyName: contact.familyName,
          displayName: contact.displayName,
          email: contact.email
        };
        this.model.set('secondaryServiceContact', secondaryServiceContact);
      } else {
        this.model.set('secondaryServiceContact', null);
      }
    },
    selectTechnicalContact(contact) {
      if (contact) {
        let technicalContact = {
          givenName: contact.givenName,
          familyName: contact.familyName,
          displayName: contact.displayName,
          email: contact.email
        };
        this.model.set('technicalContact', technicalContact);
      } else {
        this.model.set('technicalContact', null);
      }
      this.model.set('filteredContacts', this.model.contacts);
    },
    selectSecondaryTechnicalContact(contact) {
      if (contact) {
        let secondaryTechnicalContact = {
          givenName: contact.givenName,
          familyName: contact.familyName,
          displayName: contact.displayName,
          email: contact.email
        };
        this.model.set('secondaryTechnicalContact', secondaryTechnicalContact);
      } else {
        this.model.set('secondaryTechnicalContact', null);
      }
      this.model.set('filteredContacts', this.model.contacts);
    },
    selectBillingContact(contact) {
      if (contact) {
        let billingContact = {
          givenName: contact.givenName,
          familyName: contact.familyName,
          displayName: contact.displayName,
          email: contact.email
        };
        this.model.set('billingContact', billingContact);
      }
      this.model.set('filteredContacts', this.model.contacts);
    },
    selectSecondaryBillingContact(contact) {
      if (contact) {
        let secondaryBillingContact = {
          givenName: contact.givenName,
          familyName: contact.familyName,
          displayName: contact.displayName,
          email: contact.email
        };
        this.model.set('secondaryBillingContact', secondaryBillingContact);
      } else {
        this.model.set('secondaryBillingContact', null);
      }
      this.model.set('filteredContacts', this.model.contacts);
    },
    submit() {
      let self = this;
      let m = this.model;
      // iterate through all contacts and update roles
      this.model.get('contacts').forEach(function (contact) {
        let roleName = [];
        if (contact.email === m.get('votingContact.email')) {
          roleName.push('voting');
        }
        if (contact.email === m.get('serviceContact.email')) {
          roleName.push('service');
        }
        if (contact.email === m.get('secondaryServiceContact.email')) {
          roleName.push('secondary_service');
        }
        if (contact.email === m.get('technicalContact.email')) {
          roleName.push('technical');
        }
        if (contact.email === m.get('secondaryTechnicalContact.email')) {
          roleName.push('secondary_technical');
        }
        if (contact.email === m.get('billingContact.email')) {
          roleName.push('billing');
        }
        if (contact.email === m.get('secondaryBillingContact.email')) {
          roleName.push('secondary_billing');
        }
        contact.set('roleName', roleName);
        contact.save();
      });
      this.model
        .save()
        .then(function (provider) {
          self.transitionToRoute('providers.show', provider);
        })
        // Report the reason (error) to the user.  Without that, the form appears to be frozen.
        .catch(function (reason) {
          console.debug(reason);
          let msg = (reason?.errors[0]?.title ? reason.errors[0].title : ( reason?.title? reason.title : 'Error is unknown.  Please contact support.' ));

          self
          .get('flashMessages')
          .danger(
            'An error occurred and this provider could not be saved.' + '  ' + msg
          );
        });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.transitionToRoute('providers.show', this.model);
    }
  }
});
