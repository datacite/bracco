import classic from 'ember-classic-decorator';
/* eslint-disable no-useless-escape */
import BaseValidator from 'ember-cp-validations/validators/base';

@classic
class ContributorType extends BaseValidator {
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
      'Editor',
      'ProjectLeader',
      'ProjectManager',
      'ProjectMember',
      'RelatedPerson',
      'Researcher',
      'Supervisor',
      'WorkPackageLeader'
    ];

    const message = 'Contributor of the Type cannot be of that Name Type.';

    switch (true) {
      case !value && options.allowBlank:
        return true;
      case organizationalContributorTypes.includes(String(value)) &&
        model.nameType == 'Personal':
        return message;
      case personalContributorTypes.includes(String(value)) &&
        model.nameType == 'Organizational':
        return message;
      case contributorTypes.includes(String(value)):
        return true;
      default:
        return 'The value ' + value + ' is not a valid type';
    }
  }
}

export default ContributorType;
