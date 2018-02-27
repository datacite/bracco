import BaseValidator from 'ember-cp-validations/validators/base';

const validXml = BaseValidator.extend({
  validate(value) {
    try {
        self.$.parseXML(value); //is valid XML
        return true;
    } catch (err) {
        // was not well-formed
        let message = "The XML is not valid."
        return message;
    }
  }
});

validXml.reopenClass({
  getDependentsFor() {
    return ['xml'];
  }
});

export default validXml;
