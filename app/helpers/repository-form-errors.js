import { helper } from '@ember/component/helper';
import { isPresent } from '@ember/utils';

export function repositoryFormErrors([ model ]) {
  let errorAttributes = model.validations.errors.mapBy('attribute');

  // check validation errors for embed data model fragments
  if (model.serviceContact && isPresent(model.serviceContact.validations.errors)) {
    errorAttributes = errorAttributes.concat('service contact ' + model.serviceContact.validations.errors.mapBy('attribute'));
  }

  return errorAttributes.join(', ');
}

export default helper(repositoryFormErrors);
