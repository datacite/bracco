import classic from 'ember-classic-decorator';
/* eslint-disable no-useless-escape */
import BaseValidator from 'ember-cp-validations/validators/base';

@classic
class ResourceType extends BaseValidator {
  validate(value, options) {
    const resourceTypeGeneralList = [
      'Audiovisual',
      'Award',
      'Book',
      'BookChapter',
      'Collection',
      'ComputationalNotebook',
      'ConferencePaper',
      'ConferenceProceeding',
      'DataPaper',
      'Dataset',
      'Dissertation',
      'Event',
      'Image',
      'Instrument',
      'InteractiveResource',
      'Journal',
      'JournalArticle',
      'Model',
      'OutputManagementPlan',
      'PeerReview',
      'PhysicalObject',
      'Preprint',
      'Project',
      'Report',
      'Service',
      'Software',
      'Sound',
      'Standard',
      'StudyRegistration',
      'Text',
      'Workflow',
      'Other'
    ];

    const message = 'Resource of the Type is not valid.';

    switch (true) {
      case !value && options.allowBlank:
        return true;
      case resourceTypeGeneralList.includes(String(value)):
        return true;
      default:
        return message;
    }
  }
}

export default ResourceType;
