import { inject as service } from '@ember/service';
import BaseValidator from 'ember-cp-validations/validators/base';

const UniqueProviderId = BaseValidator.extend({
  store: service(),

  validate(value) {
    if (value.length < 2) {
      return true;
    } else {
      return this.store.query('provider', { id: value }).then((result) => {
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
