import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import countryList from 'iso-3166-country-list';
import {
  organizationTypeList,
  memberTypeList,
  focusAreaList,
  nonProfitStatusList
} from 'bracco/models/provider';
import { UploadFile, UploadFileReader } from 'ember-file-upload';

@classic
export default class NewController extends Controller {
  @service
  store;

  @service
  features;

  @service
  router;

  @service
  flashMessages;

  countryList = countryList;
  countries = null;
  organizationTypeList = organizationTypeList;
  organizationTypes = organizationTypeList;
  memberTypeList = memberTypeList;
  memberTypes = memberTypeList;
  focusAreaList = focusAreaList;
  focusAreas = focusAreaList;
  nonProfitStatusList = nonProfitStatusList;
  nonProfitStatuses = nonProfitStatusList;

  init(...args) {
    super.init(...args);

    this.organizations = this.organizations || [];
    this.consortia = this.consortia || [];
  }

  @action
  searchCountry(query) {
    let countries = countryList.filter(function (country) {
      return country.name.toLowerCase().startsWith(query.toLowerCase());
    });
    this.set('countries', countries);
  }

  @action
  selectCountry(country) {
    this.model.organization.set('country', country);
    this.set('countries', countryList);
  }

  @action
  searchOrganizationType(query) {
    let organizationTypes = organizationTypeList.filter(function (
      organizationType
    ) {
      return organizationType.startsWith(query.toLowerCase());
    });
    this.set('organizationTypes', organizationTypes);
  }

  @action
  selectOrganizationType(organizationType) {
    this.model.organization.set('organizationType', organizationType);
    this.set('organizationTypes', organizationTypeList);
  }

  @action
  searchMemberType(query) {
    let memberTypes = memberTypeList.filter(function (memberType) {
      return memberType.startsWith(query.toLowerCase());
    });
    this.set('memberTypes', memberTypes);
  }

  @action
  selectMemberType(memberType) {
    this.model.organization.set('memberType', memberType);
    this.set('memberTypes', memberTypeList);
  }

  @action
  searchFocusArea(query) {
    let focusAreas = focusAreaList.filter(function (focusArea) {
      return focusArea.startsWith(query.toLowerCase());
    });
    this.set('focusAreas', focusAreas);
  }

  @action
  selectFocusArea(focusArea) {
    this.model.organization.set('focusArea', focusArea);
    this.set('focusAreas', focusAreaList);
  }

  @action
  searchNonProfitStatus(query) {
    let nonProfitStatuses = nonProfitStatusList.filter(function (
      nonProfitStatus
    ) {
      return nonProfitStatus.startsWith(query.toLowerCase());
    });
    this.set('nonProfitStatuses', nonProfitStatuses);
  }

  @action
  selectNonProfitStatus(nonProfitStatus) {
    this.model.organization.set('nonProfitStatus', nonProfitStatus);
    this.set('nonProfitStatuses', nonProfitStatusList);
  }

  @action
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
  }

  @action
  selectConsortium(consortium) {
    this.model.organization.set('consortium', consortium);
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
      this.model.organization.set('rorId', ror.id);
      this.model.organization.set('name', ror.name);
      this.model.organization.set('displayName', ror.name);
    } else {
      this.model.organization.set('rorId', null);
    }
    this.set('organizations', []);
  }

  @action
  didSelectFiles(file) {
    // Type is UploadFile
    file.readAsDataURL().then((logo) => {
        this.model.set('logo', logo)
      },
      (err) => {
        console.error(err);
      }
    );
  }

  @action
  doSubmit() {
    let self = this;
    this.model.organization
      .save()
      .then(function (provider) {
        self.router.transitionTo('providers.show', provider.id);
      })
      .catch(function (reason) {
        console.debug(reason);
      });
  }

  @action
  cancel() {
    this.model.organization.rollbackAttributes();
    this.router.transitionTo(
      'providers.show.organizations',
      this.get('model.provider.id')
    );
  }
}
