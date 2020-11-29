/* eslint-disable no-useless-escape */
import BaseValidator from 'ember-cp-validations/validators/base';

const ResourceType = BaseValidator.extend({
  validate(value, options) {
    const resourceTypeGeneralList = [
      'Audiovisual',
      'Collection',
      'DataPaper',
      'Dataset',
      'Event',
      'Image',
      'InteractiveResource',
      'Model',
      'PhysicalObject',
      'Service',
      'Software',
      'Sound',
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
