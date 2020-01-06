import { helper } from '@ember/component/helper';
import { isPresent } from '@ember/utils';

export function providerFormErrors([ model ]) {
  let errorAttributes = model.validations.errors.mapBy('attribute');

  // check validation errors for embed data model fragments
  if (model.technicalContact && isPresent(model.technicalContact.validations.errors)) {
    errorAttributes = errorAttributes.concat('technical contact ' + model.technicalContact.validations.errors.mapBy('attribute'));
  }
  if (model.secondaryTechnicalContact && isPresent(model.secondaryTechnicalContact.validations.errors)) {
    errorAttributes = errorAttributes.concat('secondary technical contact ' + model.secondaryTechnicalContact.validations.errors.mapBy('attribute'));
  }
  if (model.secondaryServiceContact && isPresent(model.secondaryServiceContact.validations.errors)) {
    errorAttributes = errorAttributes.concat('service contact ' + model.serviceContact.validations.errors.mapBy('attribute'));
  }
  if (model.secondaryServiceContact && isPresent(model.secondaryServiceContact.validations.errors)) {
    errorAttributes = errorAttributes.concat('secondary service contact ' + model.secondaryServiceContact.validations.errors.mapBy('attribute'));
  }

  // the following fields are disabled for consortium organizations
  if (model.memberType !== 'consortium_organization') {
    if (model.billingContact && isPresent(model.billingContact.validations.errors)) {
      errorAttributes = errorAttributes.concat('billing contact ' + model.billingContact.validations.errors.mapBy('attribute'));
    }
    if (model.secondaryBillingContact && isPresent(model.secondaryBillingContact.validations.errors)) {
      errorAttributes = errorAttributes.concat('secondary billing contact ' + model.secondaryBillingContact.validations.errors.mapBy('attribute'));
    }
    if (model.votingContact && isPresent(model.votingContact.validations.errors)) {
      errorAttributes = errorAttributes.concat('voting contact ' + model.votingContact.validations.errors.mapBy('attribute'));
    }
  }

  return errorAttributes.join(', ');
}

export default helper(providerFormErrors);
