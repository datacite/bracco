import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const UniqueProviderId = BaseValidator.extend({
  store: Ember.inject.service(),

  validate(value, _options, model) {
    if (value.length < 2 || !model.meta.id.isEnabled) {
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
  getDependentsFor() {
    return ['id'];
  }
});

export default UniqueProviderId;
