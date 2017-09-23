import BaseValidator from 'ember-cp-validations/validators/base';

const NumberRange = BaseValidator.extend({
  validate(value, options, model, attribute) {
    let first = model.firstPrefix.split('.').get('lastObject');
    let last = value.split('.').get('lastObject');

    if ((last - first) < 0) {
      let message = "The last prefix must be or come after " + model.firstPrefix;
      return message;
    } else if ((last - first) >= 500) {
      let message = "Can't add more than 500 prefixed at a time";
      return message;
    } else {
      return true;
    }
  }
});

NumberRange.reopenClass({
  getDependentsFor(attribute, options) {
    return ['firstPrefix', 'lastPrefix'];
  }
});

export default NumberRange;
