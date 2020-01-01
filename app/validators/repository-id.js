import BaseValidator from 'ember-cp-validations/validators/base';

const RepositoryId = BaseValidator.extend({
  validate(value, options, model) {
    let providerId = model.get('provider').get('symbol') + '.';
    if (value.startsWith(providerId)) {
      return true;
    } else {
      let message = 'The Repository ID must beginn with ' + providerId;
      return message;
    }
  },
});

RepositoryId.reopenClass({
  getDependentsFor() {
    return [ 'id' ];
  },
});

export default RepositoryId;
