import { helper } from '@ember/component/helper';

export function formHasErrors([ model ]) {
  if (model.state === 'draft') {
    return false;
  }

  let invalidModel = model.validations.errors.length > 0;

  // check validation errors for embed data model fragments
  let invalidTitle = false;
  let invalidCreator = false;

  if (model.titles) {
    invalidTitle = model.titles.any(title => {
      return title.validations.errors.length > 0;
    });
  }
  if (model.creators) {
    invalidCreator = model.creators.any(creator => {
      return creator.validations.errors.length > 0;
    });
  }

  if (invalidModel) {
    model.validations.errors.forEach((error) => {
      console.log(`Invalid ${error.attribute}.`);
    });
  }
  if (invalidTitle) {
    console.log('Invalid title.');
  }
  if (invalidCreator) {
    console.log('Invalid creator.');
  }

  return invalidModel || invalidTitle || invalidCreator;
}

export default helper(formHasErrors);
