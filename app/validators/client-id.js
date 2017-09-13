import BaseValidator from 'ember-cp-validations/validators/base';

const ClientId = BaseValidator.extend({
  validate(value, options, model, attribute) {
    let providerId = model.get('provider').get('id') + '.';
    if (value.startsWith(providerId)) {
      return true;
    } else {
      let message = "The Client ID must beginn with " + providerId;
      return message;
    }
  }
});

ClientId.reopenClass({
  getDependentsFor(attribute, options) {
    return ['id'];
  }
});

export default ClientId;
