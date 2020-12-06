import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

const Validations = buildValidations({
  schemeUri: [
    validator('url-format', {
      allowBlank: true,
      message: 'Related Identifier scheme URI has to be a valid URI',
      disabled: computed('model.relatedIdentifierType', function () {
        return ['HasMetadata', 'IsMetadataFor'].includes(
          this.model.relatedIdentifierType
        );
      })
    })
  ],
  relatedIdentifier: [
    // validator('url-format', {
    //   allowBlank: true,
    //   message: 'Please enter a valid URL.',
    //   disabled: computed('model.relatedIdentifierType', 'model.state', function() {
    //     return this.model.state === 'draft' || ![ 'PURL','URL' ].includes(this.model.relatedIdentifierType);
    //   }),
    // }),
    validator('identifier-format', {
      allowBlank: true,
      dependentKeys: ['model.relatedIdentifierType'],
      disabled: computed('model.relatedIdentifier', function () {
        return isBlank(this.model.relatedIdentifier);
      })
    })
  ],
  relatedIdentifierType: [
    validator('presence', {
      presence: true,
      message:
        'Please enter a Related Identifier Type for the Related Identifier.',
      disabled: computed('model.{relatedIdentifier,state}', function () {
        return (
          this.model.state === 'draft' || isBlank(this.model.relatedIdentifier)
        );
      })
    })
  ],
  relationType: [
    validator('presence', {
      presence: true,
      message: 'Please enter a Relation Type for the Related Identifier.',
      disabled: computed('model.{relatedIdentifier,state}', function () {
        return (
          this.model.state === 'draft' || isBlank(this.model.relatedIdentifier)
        );
      })
    })
  ],
  resourceTypeGeneral: [
    validator('presence', {
      presence: true,
      message:
        'Please enter a Resource Type for the Related Identifier Metadata.',
      disabled: computed('model.{relatedIdentifierType,state}', function () {
        return (
          this.model.state === 'draft' ||
          !['HasMetadata', 'IsMetadataFor'].includes(
            this.model.relatedIdentifierType
          )
        );
      })
    })
  ]
});

export default Fragment.extend(Validations, {
  relatedIdentifier: attr('string', { defaultValue: null }),
  relatedIdentifierType: attr('string', { defaultValue: null }),
  relationType: attr('string', { defaultValue: null }),
  relatedMetadataScheme: attr('string', { defaultValue: null }),
  schemeUri: attr('string', { defaultValue: null }),
  schemeType: attr('string', { defaultValue: null }),
  resourceTypeGeneral: attr('string', { defaultValue: null })
});
