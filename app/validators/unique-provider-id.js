import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const UniqueProviderId = BaseValidator.extend({
  store: Ember.inject.service(),

  validate(value, options, model) {
    if (value.length < 2 || model && Ember.computed.not('model.meta.id.isEnabled')) {
      return true;
    } else {
      return this.get('store').query('provider', { query: value, 'include-deleted': true }).then((result) => {
        if(result.content.length > 0) {
          return "The Provider ID " + value + " already exists, or existed before and has been deleted. Please contact DataCite staff if you want to create an account with this Provider ID.";
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
