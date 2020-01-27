import { helper } from '@ember/component/helper';
import { isPresent } from '@ember/utils';

const labelList = {
  symbol: 'repository ID',
  confirmSymbol: 'confirm repository ID',
  globusUuid: 'globus UUID',
  re3data: 're3data ID',
  name: 'repository name',
  alternateName: 'repository alternate name',
  systemEmail: 'system email',
};

export function repositoryFormErrors([ model ]) {
  let errorAttributes = model.validations.errors.mapBy('attribute');

  // check validation errors for embed data model fragments
  if (model.serviceContact && isPresent(model.serviceContact.validations.errors)) {
    errorAttributes = errorAttributes.concat('service contact ' + model.serviceContact.validations.errors.mapBy('attribute'));
  }

  return errorAttributes.map(function(attribute) {
    return labelList[attribute] || attribute;
  }).join(', ');
}

export default helper(repositoryFormErrors);
