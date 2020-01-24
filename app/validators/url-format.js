import BaseValidator from 'ember-cp-validations/validators/base';
import isURL from 'validator/lib/isURL';

const UrlFormat = BaseValidator.extend({
  validate(value, options) {
    if (!value && options.allowBlank) {
      return true;
    } else {
      if (isURL(value, options)) {
        return true;
      } else {
        let message = 'Please enter a valid URL.';
        return message;
      }
    }
  },
});

export default UrlFormat;
