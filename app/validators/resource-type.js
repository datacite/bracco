/* eslint-disable no-useless-escape */
import BaseValidator from 'ember-cp-validations/validators/base';

const ResourceType = BaseValidator.extend({
  validate(value, options) {
    const resourceTypeGeneralList = [
      'Audiovisual',
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
      'InteractiveResource',
      'Journal',
      'JournalArticle',
      'Model',
      'OutputManagementPlan',
      'PeerReview',
      'PhysicalObject',
      'Preprint',
      'Service',
      'Software',
      'Sound',
      'Standard',
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
});

export default ResourceType;
