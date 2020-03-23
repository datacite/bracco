import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  schemeUri: [
    validator('url-format', {
      allowBlank: true,
      require_tld: false,
      message: 'Please enter a valid URL.',
    }),
  ],
  relatedIdentifier: [
    validator('url-format', {
      allowBlank: true,
      message: 'Please enter a valid URL.',
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.relatedIdentifierType', function() {
        return ![ 'PURL','URL' ].includes(this.model.get('relatedIdentifierType'));
      }),
    }),
  ],
  relatedIdentifierType: [
    validator('presence', {
      presence: true,
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.relatedIdentifier', function() {
        return this.model.get('relatedIdentifier') == null;
      }),
    }),
  ],
  relationType: [
    validator('presence', {
      presence: true,
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.relatedIdentifier', function() {
        return this.model.get('relatedIdentifier') == null;
      }),
    }),
  ],
  resourceTypeGeneral: [
    validator('presence', {
      presence: true,
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.relatedIdentifier', function() {
        return this.model.get('relatedIdentifier') == null;
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
