import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';
import { isBlank } from '@ember/utils';

const Validations = buildValidations({
  schemeUri: [
    validator('url-format', {
      allowBlank: true,
      message: 'Related Identifier scheme URI has to be a valid URI',
      disabled: computed('model.relatedIdentifierType', function () {
        return ['HasMetadata', 'IsMetadataFor'].includes(
          this.model.get('relatedIdentifierType')
        );
      })
    })
  ],
  relatedIdentifier: [
    // validator('url-format', {
    //   allowBlank: true,
    //   message: 'Please enter a valid URL.',
    //   disabled: computed('model.relatedIdentifierType', 'model.state', function() {
    //     return this.model.get('state') === 'draft' || ![ 'PURL','URL' ].includes(this.model.get('relatedIdentifierType'));
    //   }),
    // }),
    validator('identifier-format', {
      allowBlank: true,
      dependentKeys: ['model.relatedIdentifierType'],
      disabled: computed('model.relatedIdentifier', function () {
        return isBlank(this.model.get('relatedIdentifier'));
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
          this.model.get('state') === 'draft' ||
          isBlank(this.model.get('relatedIdentifier'))
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
          this.model.get('state') === 'draft' ||
          isBlank(this.model.get('relatedIdentifier'))
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
          this.model.get('state') === 'draft' ||
          !['HasMetadata', 'IsMetadataFor'].includes(
            this.model.get('relatedIdentifierType')
          )
        );
      })
    })
  ]
});

@classic
export default class RelatedIdentifier extends Fragment.extend(Validations) {
  @attr('string', { defaultValue: null })
  relatedIdentifier;

  @attr('string', { defaultValue: null })
  relatedIdentifierType;

  @attr('string', { defaultValue: null })
  relationType;

  @attr('string', { defaultValue: null })
  relatedMetadataScheme;

  @attr('string', { defaultValue: null })
  schemeUri;

  @attr('string', { defaultValue: null })
  schemeType;

  @attr('string', { defaultValue: null })
  resourceTypeGeneral;
}
