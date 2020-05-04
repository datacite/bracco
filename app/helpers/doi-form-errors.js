import { helper } from '@ember/component/helper';

const labelList = {
};

export function doiFormErrors([ model ]) {
  if (model.state === 'draft') {
    return [];
  }

  let errorAttributes = model.validations.errors.mapBy('attribute');

  // check validation errors for data model fragments
  if ([ 'new', 'edit' ].includes(model.mode)) {
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
    if (model.contributors) {
      model.contributors.forEach((contributor) => {
        errorAttributes = errorAttributes.concat(contributor.validations.errors.mapBy('attribute'));
      });
    }
    if (model.alternateIdentifiers) {
      model.alternateIdentifiers.forEach((alternateIdentifier) => {
        errorAttributes = errorAttributes.concat(alternateIdentifier.validations.errors.mapBy('attribute'));
      });
    }
    if (model.subjects) {
      model.subjects.forEach((subject) => {
        errorAttributes = errorAttributes.concat(subject.validations.errors.mapBy('attribute'));
      });
    }
    if (model.relatedIdentifiers) {
      model.relatedIdentifiers.forEach((relatedIdentifier) => {
        errorAttributes = errorAttributes.concat(relatedIdentifier.validations.errors.mapBy('attribute'));
      });
    }
    if (model.fundingReferences) {
      model.fundingReferences.forEach((fundingReference) => {
        errorAttributes = errorAttributes.concat(fundingReference.validations.errors.mapBy('attribute'));
      });
    }
    if (model.dates) {
      model.dates.forEach((date) => {
        errorAttributes = errorAttributes.concat(date.validations.errors.mapBy('attribute'));
      });
    }
    if (model.geoLocations) {
      model.geoLocations.forEach((geoLocation) => {
        errorAttributes = errorAttributes.concat(geoLocation.geoLocationPoint.validations.errors.mapBy('attribute'));
        errorAttributes = errorAttributes.concat(geoLocation.geoLocationBox.validations.errors.mapBy('attribute'));
      });
    }
    if (model.rightsList) {
      model.rightsList.forEach((rights) => {
        errorAttributes = errorAttributes.concat(rights.validations.errors.mapBy('attribute'));
      });
    }
  }

  return errorAttributes.map(function(attribute) {
    return labelList[attribute] || attribute;
  }).join(', ');
}

export default helper(doiFormErrors);
