/* eslint-disable no-useless-escape */
import BaseValidator from 'ember-cp-validations/validators/base';
import { RESOURCE_TYPE_GENERAL_LIST } from '../constants/resource-type-general-list';

const ResourceType = BaseValidator.extend({
  validate(value, options) {
    const resourceTypeGeneralList = RESOURCE_TYPE_GENERAL_LIST;

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
