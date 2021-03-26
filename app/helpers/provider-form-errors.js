import { helper } from '@ember/component/helper';
import { isPresent } from '@ember/utils';

const providerLabelList = {
  symbol: 'member ID',
  confirmSymbol: 'confirm member ID',
  globusUuid: 'globus UUID',
  rorId: 'ROR ID',
  name: 'provider name',
  displayName: 'provider display name',
  systemEmail: 'system email',
  votingContact: 'voting representative',
  serviceContact: 'service contact',
  billingContact: 'billing contact'
};
const organizationLabelList = {
  symbol: 'member ID',
  confirmSymbol: 'confirm member ID',
  globusUuid: 'globus UUID',
  rorId: 'ROR ID',
  name: 'organization name',
  displayName: 'organization display name',
  systemEmail: 'system email',
  serviceContact: 'service contact'
};

export function providerFormErrors([model]) {
  let errorAttributes = model.validations.errors.mapBy('attribute');

  // check validation errors for embed data model fragments
  if (
    model.serviceContact &&
    isPresent(model.serviceContact.validations.errors)
  ) {
    errorAttributes = errorAttributes.concat(
      'service contact ' +
        model.serviceContact.validations.errors.mapBy('attribute')
    );
  }

  // the following fields are disabled for consortium organizations
  if (model.memberType !== 'consortium_organization') {
    if (
      model.billingContact &&
      isPresent(model.billingContact.validations.errors)
    ) {
      errorAttributes = errorAttributes.concat(
        'billing contact ' +
          model.billingContact.validations.errors.mapBy('attribute')
      );
    }
    if (
      model.votingContact &&
      isPresent(model.votingContact.validations.errors)
    ) {
      errorAttributes = errorAttributes.concat(
        'voting contact ' +
          model.votingContact.validations.errors.mapBy('attribute')
      );
    }
  }

  return errorAttributes
    .map(function (attribute) {
      if (model.memberType === 'consortium_organization') {
        return organizationLabelList[attribute] || attribute;
      } else {
        return providerLabelList[attribute] || attribute;
      }
    })
    .join(', ');
}

export default helper(providerFormErrors);
