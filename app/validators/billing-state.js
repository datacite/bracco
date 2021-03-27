import BaseValidator from 'ember-cp-validations/validators/base';
import { isBlank } from '@ember/utils';

const BillingState = BaseValidator.extend({
  validate(value, options, model) {
    if (isBlank(model.get('billingInformation.country'))) {
      return true;
    } else if (
      !['US', 'CA', 'AU', 'CN'].includes(
        model.get('billingInformation.country.code')
      )
    ) {
      return true;
    } else if (value) {
      return true;
    } else {
      let message =
        "Your organization's state/province for billing purposes is required.";
      return message;
    }
  }
});

BillingState.reopenClass({
  getDependentsFor() {
    return ['billingInformation'];
  }
});

export default BillingState;
