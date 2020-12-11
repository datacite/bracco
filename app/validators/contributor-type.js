/* eslint-disable no-useless-escape */
import BaseValidator from 'ember-cp-validations/validators/base';

const ContributorType = BaseValidator.extend({
  validate(value, options, model) {
    const organizationalContributorTypes = [
      'HostingInstitution',
      'RegistrationAgency',
      'RegistrationAuthority',
      'ResearchGroup',
      'Distributor'
    ];

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

    const message = 'Contributor of the type cannot be of that name type.';

    switch (true) {
      case organizationalContributorTypes.includes(String(value)) &&
        model.nameType == 'Personal':
        return message;
      case personalContributorTypes.includes(String(value)) &&
        model.nameType == 'Organizational':
        return message;
      default:
        return contributorTypes.includes(String(value));
    }
  }
});

export default ContributorType;
