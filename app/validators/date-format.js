/* eslint-disable no-useless-escape */
import BaseValidator from 'ember-cp-validations/validators/base';
import { parseISO } from 'date-fns';

const DateFormat = BaseValidator.extend({
  validate(value, options) {
    if (!value && options.allowBlank) {
      return true;
    } else {
      // check that date can be parsed
      if (parseISO(value).toString() !== 'Invalid Date') {
        return true;
      } else {
        let message = 'Please enter a valid date.';
        return message;
      }
    }
  }
});

export default DateFormat;
