import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import PersonBaseComponent from './person-base-component';
import { pascalCase } from 'pascal-case';
import humanizeString from 'humanize-string';
import { isBlank } from '@ember/utils';

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
  'Translator',
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
  'Translator',
  'WorkPackageLeader'
];

@classic
export default class DoiContributor extends PersonBaseComponent {
  humanContributorTypes = humanContributorTypes;

  @computed('fragment.contributorType')
  get humanContributorType() {
    return isBlank(this.get('fragment.contributorType'))
      ? null
      : humanizeString(this.get('fragment.contributorType'));
  }

  selectContributorType(contributorType) {
    if (contributorType) {
      let contributorTypeId = pascalCase(contributorType);
      this.fragment.set('contributorType', contributorTypeId);
      this.set('contributorType', contributorType);

      if (organizationalContributorTypes.includes(contributorTypeId)) {
        this.selectNameType('Organizational');
      }

      if (personalContributorTypes.includes(contributorTypeId)) {
        this.selectNameType('Personal');
      }
    } else {
      this.fragment.set('contributorType', null);
    }
    this.set('humanContributorTypes', humanContributorTypes);
  }

  @action
  deleteContributorAction() {
    this.model.get('contributors').removeObject(this.fragment);
  }

  @action
  selectContributorTypeAction(contributorType) {
    this.selectContributorType(contributorType);
  }
}
