import { inject as service } from '@ember/service';
import BaseValidator from 'ember-cp-validations/validators/base';

const UniqueClientId = BaseValidator.extend({
  store: service(),

  validate(value, options, model) {
    let providerId = model.get('provider').get('symbol') + '.';
    if (value === providerId) {
      return true;
    } else {
      return this.store.query('client', { id: value }).then((result) => {
        if(result.content.length > 0) {
          return "The Client ID " + value + " already exists, or existed before and has been deleted. Contact DataCite staff if you want to create an account with this Client ID.";
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
