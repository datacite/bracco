import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import countryList from 'iso-3166-country-list';
import {
  organizationTypeList,
  memberTypeList,
  focusAreaList,
  nonProfitStatusList
} from 'bracco/models/provider';

export default Controller.extend({
  store: service(),
  features: service(),

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

  init(...args) {
    this._super(...args);

    this.organizations = this.organizations || [];
    this.consortia = this.consortia || [];
  },

  actions: {
    searchCountry(query) {
      let countries = countryList.filter(function (country) {
        return country.name.toLowerCase().startsWith(query.toLowerCase());
      });
      this.set('countries', countries);
    },
    selectCountry(country) {
      this.model.organization.set('country', country);
      this.set('countries', countryList);
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
      this.model.organization.set('organizationType', organizationType);
      this.set('organizationTypes', organizationTypeList);
    },
    searchMemberType(query) {
      let memberTypes = memberTypeList.filter(function (memberType) {
        return memberType.startsWith(query.toLowerCase());
      });
      this.set('memberTypes', memberTypes);
    },
    selectMemberType(memberType) {
      this.model.organization.set('memberType', memberType);
      this.set('memberTypes', memberTypeList);
    },
    searchFocusArea(query) {
      let focusAreas = focusAreaList.filter(function (focusArea) {
        return focusArea.startsWith(query.toLowerCase());
      });
      this.set('focusAreas', focusAreas);
    },
    selectFocusArea(focusArea) {
      this.model.organization.set('focusArea', focusArea);
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
      this.model.organization.set('nonProfitStatus', nonProfitStatus);
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
      this.model.organization.set('consortium', consortium);
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
        this.model.organization.set('rorId', ror.id);
        this.model.organization.set('name', ror.name);
        this.model.organization.set('displayName', ror.name);
      } else {
        this.model.organization.set('rorId', null);
      }
      this.set('organizations', []);
    },
    didSelectFiles(file) {
      let reader = new FileReader();
      let self = this;

      reader.readAsDataURL(file.blob).then(
        (logo) => {
          self.model.organization.set('logo', logo);
        },
        (err) => {
          console.error(err);
        }
      );
    },
    submit() {
      let self = this;
      this.model.organization
        .save()
        .then(function (provider) {
          self.transitionToRoute('providers.show', provider.id);
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      this.model.organization.rollbackAttributes();
      this.transitionToRoute(
        'providers.show.organizations',
        this.get('model.provider.id')
      );
    }
  }
});
