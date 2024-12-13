// Finish conversion of this component to a @glimmer component.
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import { pascalCase } from 'pascal-case';
import humanizeString from 'humanize-string';
import { isBlank } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

const contributorTypes = [
  'ContactPerson',
  'DataCollector',
  'DataCurator',
  'DataManager',
  'Distributor',
  'Editor',
  'HostingInstitution',
  'Producer',
  'ProjectLeader',
  'ProjectManager',
  'ProjectMember',
  'RegistrationAgency',
  'RegistrationAuthority',
  'RelatedPerson',
  'Researcher',
  'ResearchGroup',
  'RightsHolder',
  'Sponsor',
  'Supervisor',
  'WorkPackageLeader',
  'Other'
];

const humanContributorTypes = contributorTypes.map((type) =>
  humanizeString(type)
);

export default class DoiRelatedItemContributor extends Component {
  humanContributorTypes = humanContributorTypes;

  @computed('fragment.contributorType')
  get humanContributorType() {
    return isBlank(this.fragment.contributorType)
      ? null
      : humanizeString(this.fragment.contributorType);
  }

  @computed('fragment.nameType')
  get showPersonal() {
    return this.fragment.nameType !== 'Organizational';
  }

  isReadonlyNameType = false;
  isReadonly = false;
  isReadonlyNameParts = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
  }

  joinNameParts(options = {}) {
    if (options.nameIdentifierScheme === 'ORCID') {
      this.fragment.nameType = 'Personal';
      this.nameType = 'Personal';
      this.isReadonlyNameParts = true;
      this.isReadonlyNameType = true;
    } else if (options.nameIdentifierScheme === 'ROR') {
      this.fragment.nameType = 'Organizational';
      this.nameType = 'Organizational';
      this.isReadonlyNameType = true;
    } else {
      options.givenName = options.givenName || this.fragment.givenName;
      options.familyName =
        options.familyName || this.fragment.familyName;
      options.name = options.name || this.fragment.name;

      this.isReadonlyNameParts = false;
      this.isReadonlyNameType = false;
    }
    switch (true) {
      case this.fragment.nameType === 'Personal':
        this.isReadonly = true;

        this.fragment.givenName = options.givenName;
        this.fragment.familyName = options.familyName;

        if (options.givenName && options.familyName) {
          this.fragment.set(
            'name',
            options.familyName + ', ' + options.givenName
          );
        } else if (options.givenName) {
          this.fragment.name = options.givenName;
        } else if (options.familyName) {
          this.fragment.name = options.familyName;
        } else {
          this.fragment.name = options.name;
        }
        return true;
      case this.fragment.nameType === 'Organizational':
        this.fragment.givenName = null;
        this.fragment.familyName = null;
        this.fragment.name  = options.name;
        this.isReadonly = false;
        return true;
      default:
        this.fragment.givenName = options.givenName;
        this.fragment.familyName = options.familyName;
        this.fragment.name = options.name;
        this.isReadonly = false;
        return true;
    }
  }

  selectContributorType(contributorType) {
    if (contributorType) {
      let contributorTypeId = pascalCase(contributorType);
      this.fragment.contributorType = contributorTypeId;
      this.contributorType = contributorType;
    } else {
      this.fragment.contributorType = null;
    }
    this.humanContributorTypes = humanContributorTypes;
  }

  @action
  updateName(value) {
    this.fragment.name = value;
  }

  @action
  doSelectContributorType(contributorType) {
    this.selectContributorType(contributorType);
  }

  @action
  deleteRelatedItemContributor() {
    this.creator.contributors.removeObject(this.fragment);
  }
}
