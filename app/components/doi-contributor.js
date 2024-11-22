// Finish conversion of this component to a @glimmer component.
import { action, computed } from '@ember/object';
import PersonBaseComponent from './person-base-component';
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

const organizationalContributorTypes = [
  'HostingInstitution',
  'RegistrationAgency',
  'RegistrationAuthority',
  'ResearchGroup',
  'Distributor'
];

const personalContributorTypes = [
  'ContactPerson',
  'DataCurator',
  'Editor',
  'ProjectLeader',
  'ProjectManager',
  'ProjectMember',
  'RelatedPerson',
  'Researcher',
  'Supervisor',
  'WorkPackageLeader'
];

export default class DoiContributor extends PersonBaseComponent {
  humanContributorTypes = humanContributorTypes;

  @computed('fragment.contributorType')
  get humanContributorType() {
    return isBlank(this.fragment.contributorType)
      ? null
      : humanizeString(this.fragment.contributorType);
  }

  selectContributorType(contributorType) {
    if (contributorType) {
      let contributorTypeId = pascalCase(contributorType);
      this.fragment.contributorType = contributorTypeId;
      this.contributorType = contributorType;

      if (organizationalContributorTypes.includes(contributorTypeId)) {
        this.selectNameType('Organizational');
      }

      if (personalContributorTypes.includes(contributorTypeId)) {
        this.selectNameType('Personal');
      }
    } else {
      this.fragment.contributorType = null;
    }
    this.humanContributorTypes = humanContributorTypes;
  }

  @action
  deleteContributorAction() {
    this.model.contributors.removeObject(this.fragment);
  }

  @action
  selectContributorTypeAction(contributorType) {
    this.selectContributorType(contributorType);
  }
}
