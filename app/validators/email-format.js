import classic from 'ember-classic-decorator';
import BaseValidator from 'ember-cp-validations/validators/base';
import isEmail from 'validator/lib/isEmail';

@classic
class EmailFormat extends BaseValidator {
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
  }
}

export default EmailFormat;
