/* eslint-disable no-useless-escape */
import BaseValidator from 'ember-cp-validations/validators/base';

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

const ResourceType = BaseValidator.extend({
  validate(value) {
    if (resourceTypeGeneralList.includes(String(value))) {
      return true;
    } else {
      return `${value} is not a valid resource type.`;
    }
  }
});

export default ResourceType;
