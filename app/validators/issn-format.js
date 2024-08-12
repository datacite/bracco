import classic from 'ember-classic-decorator';
import BaseValidator from 'ember-cp-validations/validators/base';
import isISSN from 'validator/lib/isISSN';

@classic
class IssnFormat extends BaseValidator {
  validate(value, options) {
    if (!value && options.allowBlank) {
      return true;
    } else {
      if (isISSN(value, options)) {
        return true;
      } else {
        let message = 'Please enter a valid ISSN.';
        return message;
      }
    }
  }
}

export default IssnFormat;
