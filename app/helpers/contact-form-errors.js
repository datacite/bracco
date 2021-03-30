import { helper } from '@ember/component/helper';

const labelList = {
  givenName: 'given name',
  familyName: 'family name'
};

export function contactFormErrors([model]) {
  let errorAttributes = model.validations.errors.mapBy('attribute');

  return errorAttributes
    .map(function (attribute) {
      return labelList[attribute] || attribute;
    })
    .join(', ');
}

export default helper(contactFormErrors);
