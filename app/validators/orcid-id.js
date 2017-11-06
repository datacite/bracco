import BaseValidator from 'ember-cp-validations/validators/base';
import Checkdigit from 'npm:checkdigit';

// validate ORCID ID checksum
const OrcidId = BaseValidator.extend({
  validate(value) {
    let num = value.replace(/-/g, '');
    if (Checkdigit.mod11.isValid(num)) {
      return true;
    } else {
      let message = "Checksum does not validate for " + value + ".";
      return message;
    }
  }
});

OrcidId.reopenClass({
  getDependentsFor() {
    return ['id'];
  }
});

export default OrcidId;
