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
      disabled: computed('model.relatedItemIdentifierType', function () {
        return ['HasMetadata', 'IsMetadataFor'].includes(
          this.model.get('relatedItemIdentifierType')
        );
      })
    })
  ],
  relatedItemIdentifier: [
    validator('related-item-identifier-format', {
      allowBlank: true,
      message: 'Identifier format is wrong',
      dependentKeys: ['model.relatedItemIdentifierType'],
      disabled: computed('model.relatedItemIdentifier', function () {
        return isBlank(this.model.get('relatedItemIdentifier'));
      })
    })
  ],
  relatedItemIdentifierType: [
    validator('presence', {
      presence: true,
      message:
        'Please enter a Related Identifier Type for the Related Identifier.',
      disabled: computed('model.{relatedItemIdentifier,state}', function () {
        return (
          this.model.get('state') === 'draft' ||
          isBlank(this.model.get('relatedItemIdentifier'))
        );
      })
    })
  ]
});

export default Fragment.extend(Validations, {
  relatedItemIdentifier: attr('string', { defaultValue: null }),
  relatedItemIdentifierType: attr('string', { defaultValue: null }),
  relatedMetadataScheme: attr('string', { defaultValue: null }),
  schemeUri: attr('string', { defaultValue: null }),
  schemeType: attr('string', { defaultValue: null }),
});
