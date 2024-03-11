/* eslint-disable no-useless-escape */
import BaseValidator from 'ember-cp-validations/validators/base';
import edtf from 'edtf';

const DateFormat = BaseValidator.extend({
  validate(value, options) {
    switch (true) {
      case !value && options.allowBlank:
        return true;
      case value.startsWith('-'):
        return /-\d{4}/.test(value) ? true : 'Please enter a valid date';
      default:
        try {
          let status = edtf.parse(value, {
            types: ['Date', 'Year', 'Decade', 'Century', 'Season', 'Interval']
          });
          if (typeof status !== 'undefined') {
            return true;
          } else {
            let message = 'Please enter a valid date';
            return message;
          }
        } catch (error) {
          let message = 'Please enter a valid date';
          return message;
        }
    }
  }
});

export default DateFormat;
