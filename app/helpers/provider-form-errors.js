import { helper } from '@ember/component/helper';

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
