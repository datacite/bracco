import { helper } from '@ember/component/helper';

export function modelDisabled([isValid, state, creators]) {
  let nameIdentifiersErrors = creators.filter(function(creator) {
    return creator.get('validations.attrs.nameIdentifiers.errors').length > 0;
  });
  return !(isValid || state === "draft") || nameIdentifiersErrors.length > 0;
}

export default helper(modelDisabled);
