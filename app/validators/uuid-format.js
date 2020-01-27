import BaseValidator from 'ember-cp-validations/validators/base';
import isUUID from 'validator/lib/isUUID';

const UuidFormat = BaseValidator.extend({
  validate(value, options) {
    if (!value && options.allowBlank) {
      return true;
    } else if (options.version) {
      if (isUUID(value, options.version)) {
        return true;
      } else {
        let message = `Please enter a valid UUID (version ${options.version}).`;
        return message;
      }
    } else {
      if (isUUID(value)) {
        return true;
      } else {
        let message = 'Please enter a valid UUID.';
        return message;
      }
    }
  },
});

export default UuidFormat;
