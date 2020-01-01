import BaseValidator from 'ember-cp-validations/validators/base';
import { parseString } from 'xml2js';
import { isPresent } from '@ember/utils';

const validXml = BaseValidator.extend({
  validate(value) {
    parseString(value, function(err, result) {
      if (err) {
        // was not well-formed
        let message = 'The XML formatting is not valid.';
        return message;
      } else {
        return isPresent(result);
      }
    });
  },
});

validXml.reopenClass({
  getDependentsFor() {
    return [ 'xml' ];
  },
});

export default validXml;
