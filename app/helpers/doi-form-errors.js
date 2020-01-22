import { helper } from '@ember/component/helper';

const labelList = {
};

export function doiFormErrors([ model ]) {
  if (model.state === 'draft') {
    return [];
  }

  let errorAttributes = model.validations.errors.mapBy('attribute');

  // check validation errors for embed data model fragments
  if (model.titles) {
    model.titles.forEach((title) => {
      errorAttributes = errorAttributes.concat(title.validations.errors.mapBy('attribute'));
    });
  }
  if (model.creators) {
    model.creators.forEach((creator) => {
      errorAttributes = errorAttributes.concat(creator.validations.errors.mapBy('attribute'));
    });
  }
  return errorAttributes.map(function(attribute) {
    return labelList[attribute] || attribute;
  }).join(', ');
}

export default helper(doiFormErrors);
