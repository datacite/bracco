import PersonBaseComponent from './person-base-component';

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

export default PersonBaseComponent.extend({
  contributorTypes,
  selectContributorType(contributorType) {
    if (contributorType) {
      this.fragment.set('contributorType', contributorTypes.filter(function(type) {return type === contributorType;}));
      this.set('contributorType', contributorType);
      [ 'HostingInstitution', 'RegistrationAgency','RegistrationAuthority', 'ResearchGroup' ].includes(contributorType) ? this.selectNameType('Organizational') : this.selectNameType('Personal');
    } else {
      this.fragment.set('contributorType', null);
    }
    this.set('contributorTypes', contributorTypes);
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
