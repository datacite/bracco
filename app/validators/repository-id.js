import BaseValidator from 'ember-cp-validations/validators/base';

const RepositoryId = BaseValidator.extend({
  validate(value, options, model) {
    let providerId = model.provider.symbol + '.';
    if (value.startsWith(providerId)) {
      return true;
    } else {
      let message = 'The Repository ID must begin with ' + providerId;
      return message;
    }
  }
});

RepositoryId.reopenClass({
  getDependentsFor() {
    return ['symbol'];
  }
});

export default RepositoryId;
