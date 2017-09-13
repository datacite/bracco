import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const UniqueProviderId = BaseValidator.extend({
  store: Ember.inject.service(),

  validate(value, options, model, attribute) {
    if (value.length < 2) {
      return true;
    } else {
      return this.get('store').query('provider', { id: value }).then((result) => {
        if(result.content.length > 0) {
          return "The Provider ID " + value + " already exists.";
        } else {
          return true;
        }
      });
    }
  }
});

UniqueProviderId.reopenClass({
  getDependentsFor(attribute, options) {
    return ['id'];
  }
});

export default UniqueProviderId;
