import PersonBaseComponent from './person-base-component';
import { pascalCase } from 'pascal-case';
import humanizeString from 'humanize-string';
import { computed } from '@ember/object';
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
  'WorkPackageLeader',
  'Other',
];

const humanContributorTypes = contributorTypes.map(type => humanizeString(type));

const organizationalContributorTypes = [
  'HostingInstitution',
  'RegistrationAgency',
  'RegistrationAuthority',
  'ResearchGroup',
  'Distributor',
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
  'WorkPackageLeader',
];

export default PersonBaseComponent.extend({
  humanContributorTypes,
  humanContributorType: computed('fragment.contributorType', function() {
    return isBlank(this.get('fragment.contributorType')) ? null : humanizeString(this.get('fragment.contributorType'));
  }),

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
  },

  actions: {
    deleteContributor() {
      this.model.get('contributors').removeObject(this.fragment);
    },
    selectContributorType(contributorType) {
      this.selectContributorType(contributorType);
    },
  },
});
