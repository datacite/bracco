import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';
import fetch from 'fetch';
import countryList from 'iso-3166-country-list';
import ENV from 'bracco/config/environment';
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
  focusAreaList,
  focusAreas: focusAreaList,

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
    edit(provider) {
      this.set('provider', provider);
      this.provider.set('confirmSymbol', provider.get('symbol'));
      this.set('countries', countryList);
      this.set('edit', true);
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
          self.get('router').transitionTo('/providers');
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
    searchFocusArea(query) {
      this.searchFocusArea(query);
    },
    selectFocusArea(focusArea) {
      this.selectFocusArea(focusArea);
    }
  }
});
