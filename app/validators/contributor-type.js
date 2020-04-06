/* eslint-disable no-useless-escape */
import BaseValidator from 'ember-cp-validations/validators/base';

const ContributorType = BaseValidator.extend({

  validate(value, options, model) {
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

    const message = 'Contributor of the Type cannot be of that Name Type.';

    switch (true) {
      case (!value && options.allowBlank):
        return true;
      case organizationalContributorTypes.includes(value[0]) && model.nameType == 'Personal':
        return message;
      case personalContributorTypes.includes(value[0]) && model.nameType == 'Organizational':
        return message;
      default:
        return true;
    }
  },
});

export default ContributorType;
