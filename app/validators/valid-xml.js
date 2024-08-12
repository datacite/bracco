import classic from 'ember-classic-decorator';
import BaseValidator from 'ember-cp-validations/validators/base';
import { parseString } from 'xml2js';
import { isPresent } from '@ember/utils';

@classic
class validXml extends BaseValidator {
  validate(value) {
    parseString(value, function (err, result) {
      if (err) {
        // was not well-formed
        let message = 'The XML formatting is not valid.';
        return message;
      } else {
        return isPresent(result);
      }
    });
  }
}

validXml.reopenClass({
  getDependentsFor() {
    return ['xml'];
  }
});

export default validXml;
