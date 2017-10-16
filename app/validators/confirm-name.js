import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const ConfirmName = BaseValidator.extend({
  store: Ember.inject.service(),

  validate(value, options, model) {
    if (value === model.get('name')) {
      return true
    } else if (model.client) {
      return value + " doesn't match the client name.";
    } else if (model.provider) {
      return value + " doesn't match the provider name.";
    } else {
      return value + " doesn't match the expected name.";
    };
  }
});

ConfirmName.reopenClass({
  getDependentsFor() {
    return ['name'];
  }
});

export default ConfirmName;
