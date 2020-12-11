import BaseValidator from 'ember-cp-validations/validators/base';
import { parseString } from 'xml2js';
import { isPresent } from '@ember/utils';

let message;

const validXml = BaseValidator.extend({
  validate(value) {
    parseString(value, function (err, result) {
      if (err) {
        // was not well-formed
        message = 'The content is not valid XML.';
      } else {
        message = isPresent(result);
      }
    });
    return message;
  }
});

validXml.reopenClass({
  getDependentsFor() {
    return ['xml'];
  }
});

export default validXml;
