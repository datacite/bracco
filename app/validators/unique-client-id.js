import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const UniqueClientId = BaseValidator.extend({
  store: Ember.inject.service(),

  validate(value, options, model) {
    let providerId = model.get('provider').get('symbol') + '.';
    if (value === providerId || Ember.computed.not('model.meta.id.isEnabled')) {
      return true;
    } else {
      return this.get('store').query('client', { query: value, 'include-deleted': true }).then((result) => {
        if(result.content.length > 0) {
          return "The Client ID " + value + " already exists, or existed before and has been deleted. Please contact DataCite staff if you want to create an account with this Client ID.";
        } else {
          return true;
        }
      });
    }
  }
});

UniqueClientId.reopenClass({
  getDependentsFor() {
    return ['id'];
  }
});

export default UniqueClientId;
