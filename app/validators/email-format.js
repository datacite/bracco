import BaseValidator from 'ember-cp-validations/validators/base';
import isEmail from 'validator/lib/isEmail';

const EmailFormat = BaseValidator.extend({
  validate(value, options) {
    if (!value && options.allowBlank) {
      return true;
    } else {
      if (isEmail(value, options)) {
        return true;
      } else {
        let message = 'Please enter a valid email address.';
        return message;
      }
    }
  },
});

export default EmailFormat;
