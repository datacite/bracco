import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

const Validations = buildValidations({
  schemeUri: [
    validator('url-format', {
      allowBlank: true,
      message: 'Related Identifier scheme URI has to be a valid URI',
      disabled: computed('model.relatedIdentifierType', function() {
        return [ 'HasMetadata', 'IsMetadataFor' ].includes(this.model.get('relatedIdentifierType'));
      }),
    }),
  ],
  relatedIdentifier: [
    // validator('url-format', {
    //   allowBlank: true,
    //   message: 'Please enter a valid URL.',
    //   isWarning: computed('model.state', function() {
    //     return this.model.get('state') === 'draft';
    //   }),
    //   disabled: computed('model.relatedIdentifierType', function() {
    //     return ![ 'PURL','URL' ].includes(this.model.get('relatedIdentifierType'));
    //   }),
    // }),
    validator('identifier-format', {
      allowBlank: true,
      dependentKeys: [ 'model.relatedIdentifierType' ],
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.relatedIdentifier', function() {
        return isBlank(this.model.get('relatedIdentifier'));
      }),
    }),
  ],
  relatedIdentifierType: [
    validator('presence', {
      presence: true,
      message: 'Please enter a Related Identifier Type for the Related Identifier.',
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.relatedIdentifier', function() {
        return isBlank(this.model.get('relatedIdentifier'));
      }),
    }),
  ],
  relationType: [
    validator('presence', {
      presence: true,
      message: 'Please enter a Relation Type for the Related Identifier.',
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.relatedIdentifier', function() {
        return isBlank(this.model.get('relatedIdentifier'));
      }),
    }),
  ],
  resourceTypeGeneral: [
    validator('presence', {
      presence: true,
      message: 'Please enter a Resource Type for the Related Identifier Metadata.',
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.relatedIdentifierType', function() {
        return ![ 'HasMetadata', 'IsMetadataFor' ].includes(this.model.get('relatedIdentifierType'));
      }),
    }),
  ],
});

export default Fragment.extend(Validations, {
  relatedIdentifier: DS.attr('string', { defaultValue: null }),
  relatedIdentifierType: DS.attr('string', { defaultValue: null }),
  relationType: DS.attr('string', { defaultValue: null }),
  relatedMetadataScheme: DS.attr('string', { defaultValue: null }),
  schemeUri: DS.attr('string', { defaultValue: null }),
  schemeType: DS.attr('string', { defaultValue: null }),
  resourceTypeGeneral: DS.attr('string', { defaultValue: null }),
});
