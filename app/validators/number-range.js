import BaseValidator from 'ember-cp-validations/validators/base';

const NumberRange = BaseValidator.extend({
  validate(value, options, model, attribute) {
    let first = model.firstPrefix.split('.').get('lastObject');
    let last = value.split('.').get('lastObject');

    if ((last - first) < 0) {
      let message = "The last prefix must be or come after " + model.firstPrefix;
      return message;
    } else if ((last - first) >= 50) {
      let message = "Can't add more than 50 prefixed at a time";
      return message;
    } else {
      return true;
    }
    return;
  }
});

NumberRange.reopenClass({
  getDependentsFor(attribute, options) {
    return ['firstPrefix', 'lastPrefix'];
  }
});

export default NumberRange;
